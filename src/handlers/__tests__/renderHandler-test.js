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

describe('renderHandler', () => {
  var documentation;
  var renderHandler;
  var statement;

  beforeEach(() => {
    ({statement} = require('../../../tests/utils'));
    documentation = new (require('../../Documentation'));
    renderHandler = require('../renderHandler').default;
  });

  it('extracts the render', () => {
    var definition = statement(`
      class Foo {
        render () {
          return <div id='balabala' class='aaaa'>
            <aaa>123</aaa>
            <div>456</div>
          </div>
        }
      }
    `);
    renderHandler(documentation, definition);
    console.log(documentation)
    console.log(documentation.toObject())
    // expect(documentation.displayName).toBe('BarFoo');
  });
});
