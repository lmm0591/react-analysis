/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 *
 */

import type Documentation from '../Documentation';
import getMemberValuePath from '../utils/getMemberValuePath';
import getImportPath from '../utils/getImportPath';
import resolveFunctionDefinitionToReturnValue from '../utils/resolveFunctionDefinitionToReturnValue';

// TODO: 罗列出静态的元素
var staticElementReg = /(div|span|label|xxxx)/

function JSXElementParse(jsxElement: JSXElement,path: NodePath, result: Array<JSXElement>) {
  if (jsxElement.openingElement) {
    const elementName = jsxElement.openingElement.name.name;
    const isStaticElement = staticElementReg.test(elementName)
    jsxElement.elementName = elementName
    jsxElement.isStaticElement = isStaticElement
    jsxElement.importPath = isStaticElement ? null : getImportPath(path, elementName)

    result.push(jsxElement)
    jsxElement.children.forEach(jsxElement => { 
      JSXElementParse(jsxElement, path, result)
    })
  }
}

// const {types: {namedTypes: types}} = recast;
function getJSXElements(jsxElement: JSXElement, path: NodePath): Array<JSXElement> { 
  let result: Array<JSXElement> = [];
  JSXElementParse(jsxElement, path, result);
  return result;
}

export default function renderHandler(
  documentation: Documentation,
  path: NodePath
) {
  let renderPath: NodePath = getMemberValuePath(path, 'render');
  let elements = resolveFunctionDefinitionToReturnValue(renderPath).node
  let jsxElements = getJSXElements(elements, path)
  jsxElements.forEach(jsxElement => documentation.addJSXElement(jsxElement))
}
