/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/*global jest, describe, beforeEach, it, expect*/

// jest.disableAutomock();
// jest.mock('../../Documentation');
import getMemberValuePath from '../../utils/getMemberValuePath';

describe('renderHandler', () => {
  var documentation;
  var renderHandler;
  var statement;
  var defaultPropsHandler;
  var parse;

  beforeEach(() => {
    ({statement, parse } = require('../../../tests/utils'));
    documentation = new (require('../../Documentation'));
    renderHandler = require('../renderHandler').default;
    defaultPropsHandler = require('../defaultPropsHandler').default;
  });

  it('extracts the render', () => {
    var definition = parse(`
    import ImportedComponent from '../../ImportedComponent';
    class Foo {
        name() {

        }

        getDefaultProps () {
          var e = 1
          return {
            foo: ImportedComponent,
            bar: e,
            baz: ["foo", "bar"],
            abc: {xyz: abc.def, 123: 42}
          };
        } 

        render () {
          var aaa = ImportedComponent
          return <ImportedComponent id='{a}' class='aaaa'>
            <div>123</div>
            <div>456</div>
          </ImportedComponent>
        }
      }
    `).get('body', 1);
    // definition.
    // console.log(definition)
    // console.log(definition.scope.getBindings())
    // console.log(definition.scope.declares('bbb'))
    // console.log(definition.scope.getBindings())
    // getMemberValuePath(definition[2], 'render');
    // console.log(getMemberValuePath(definition[2], 'render'))
    console.log(definition)
    renderHandler(documentation, definition);
    console.log(documentation.toObject())

    // console.log(documentation)
    // console.log(documentation.toObject())
    // expect(documentation.displayName).toBe('BarFoo');
  });
});
