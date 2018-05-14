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
// import getNameOrValue from '../utils/getNameOrValue';
// import recast from 'recast';
// import resolveToValue from '../utils/resolveToValue';
import resolveFunctionDefinitionToReturnValue from '../utils/resolveFunctionDefinitionToReturnValue';

// TODO: 罗列出静态的元素
var staticElementReg = /(div|span|label|xxxx)/

function JSXElementParse(jsxElement: JSXElement, result: Array) {
  if (jsxElement.openingElement) {
    const elementName = jsxElement.openingElement.name.name;
    let value =  {
      elementName,
      loc: {
        start: jsxElement.loc.start,
        end: jsxElement.loc.end,
      },
      type: jsxElement.type,
      isStaticElement: staticElementReg.test(elementName),
      attributes: jsxElement.openingElement.attributes,
    }
    result.push(value)
    jsxElement.children.forEach(jsxElement => { 
      JSXElementParse(jsxElement, result)
    })
  }
}

// const {types: {namedTypes: types}} = recast;
function getJSXElements(jsxElement: JSXElement): [JSXElement] { 
  console.log('getJSXElements');
  console.log(jsxElement);
  let result = [];
  JSXElementParse(jsxElement, result);
  return result;
}
export default function renderHandler(
  documentation: Documentation,
  path: NodePath
) {
  let renderPath = getMemberValuePath(path, 'render');
  console.log('render')
  console.log(renderPath)
  let elements = resolveFunctionDefinitionToReturnValue(renderPath).node
  console.log(elements)
  let jsxElements = getJSXElements(elements)
  jsxElements.forEach(jsxElement => documentation.addJSXElement(jsxElement))
}
