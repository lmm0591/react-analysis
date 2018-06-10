/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

 // 操作 defaultProps
import getMemberValuePath from '../utils/getMemberValuePath';
import recast from 'recast';
import resolveFunctionDefinitionToReturnValue from '../utils/resolveFunctionDefinitionToReturnValue';
import findExportedComponentDefinition from '../resolver/findExportedComponentDefinition';
import { namedTypes, builders } from 'ast-types';


function setProp (defaultPropsPath, key, value) {
  let prop = defaultPropsPath.get('properties').value.filter(property => { 
    return property.key.name === key
  })[0]
  if (prop === undefined) { // 之前没有同名的 key 
    prop = builders.property('init', builders.identifier(key), builders.literal(value))
    defaultPropsPath.get('properties').push(prop)
  } else { 
    prop.value.value = value;
  }
}

function setClassExp(componentDef: NodePath, key: string, value: any): void {
  if (namedTypes.ClassDeclaration.check(componentDef.value)) {
    let defaultPropsPath = getMemberValuePath(componentDef, 'defaultProps')
    if (defaultPropsPath == null) {
      var objectExp = builders.objectExpression([]) // {}
      let defaultProps = builders.classProperty( // static defaultProps = { name: "limingmin" };
        builders.identifier('defaultProps'),
        objectExp,
        null,
        true
      );
      componentDef.get('body').value.body.push(defaultProps)
      defaultPropsPath = getMemberValuePath(componentDef, 'defaultProps')
    }

    if (namedTypes.ObjectExpression.check(defaultPropsPath.value)) {
      setProp(defaultPropsPath, key, value)
    }
  }
}

function setObjectExp(componentDef: NodePath, key: string, value: any): void {
  if (namedTypes.ObjectExpression.check(componentDef.value)) {
    let defaultPropsPath = getMemberValuePath(componentDef, 'defaultProps')
    if (defaultPropsPath == null) {
      var objectExp = builders.objectExpression([]) // {}
      var defaultPropsStatement = builders.blockStatement([builders.returnStatement(objectExp)]);
      let defaultProps = builders.property( // getDefaultProps: function () { return { key: value}}
        'init',
        builders.identifier('getDefaultProps'),
        builders.functionExpression( // function () { return { key: value}}
          null,
          [],
          defaultPropsStatement
        )
      )
      componentDef.value.properties.push(defaultProps);
      defaultPropsPath = getMemberValuePath(componentDef, 'defaultProps')
    }
    if (namedTypes.Function.check(defaultPropsPath.value)) {
      const returnValue = resolveFunctionDefinitionToReturnValue(defaultPropsPath);
      setProp(returnValue, key, value)
      // returnValue.get('properties').push(builders.property('init', builders.identifier(key), builders.literal(value)));
    }
  }
}

export function setDefaultProps(
  ast: NodePath,
  key: string,
  value: any,
) {
  let componentDef: NodePath = findExportedComponentDefinition(ast, recast)
  console.log(componentDef)

  if (namedTypes.ObjectExpression.check(componentDef.value)) {
    setObjectExp(componentDef, key, value);
  } else if (namedTypes.ClassDeclaration.check(componentDef.value)) {
    setClassExp(componentDef, key, value);
  }
  return componentDef;
  // console.log(recast.print(componentDef).code);
  // getDefaultPropsPath(componentDefinition)
  /*
  var statelessProps = null;
  debugger
  var defaultPropsPath = getDefaultPropsPath(nodePath);
  if (isStatelessComponent(nodePath)) {
    statelessProps = getStatelessPropsPath(nodePath);
  }
  console.log(defaultPropsPath)
  */
  /*
  // Do both statelessProps and defaultProps if both are available so defaultProps can override
  if (statelessProps && types.ObjectPattern.check(statelessProps.node)) {
    getDefaultValuesFromProps(statelessProps.get('properties'), documentation, true);
  }
  if (defaultPropsPath && types.ObjectExpression.check(defaultPropsPath.node)) {
    getDefaultValuesFromProps(defaultPropsPath.get('properties'), documentation, false);
  }
  */
}
