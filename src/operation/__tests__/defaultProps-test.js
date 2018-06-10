/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import recast from 'recast';

describe('defaultPropstest-operation', () => {
  var setDefaultProps;
  var parse;
  beforeEach(() => {
    parse = require('../../../tests/utils').parse
    setDefaultProps = require('../defaultProps').setDefaultProps;
  });
  

  function test(code, key, value) {
    console.log('===========');
    var ast = parse(code, recast);
    window.ast = ast;
    // console.log(ast.get('body', 0, 'expression', 'arguments', 0));
    setDefaultProps(ast, key, value);
    console.log(recast.print(ast).code);
  }

  xdescribe('ObjectExpression', () => {
    it('没有 defaultProps 的情况，创建一个 defaultProps', () => {
      var code = `
        var React = require("React");
        var Component =  React.createClass({
          render: function() {
            return <h1>This is my </h1>
          }
        });
        module.exports = Component;
      `;
      test(code, 'name', 'limingmin')
    });

    it('有 defaultProps 的情况，创建增加一个 Props', () => {
      var code = `
        var React = require("React");
        var Component =  React.createClass({
          getDefaultProps: function() {
            return {
              name: "limingmin"
            };
          },

          render: function() {
            return <h1>This is my </h1>
          }
        });
        module.exports = Component;
      `;
      test(code, 'age', 11)
    });
    

    it('带赋值表达式', () => {
      var code = `
        var React = require("React");
        var Component =  React.createClass({
          getDefaultProps: function() {
            let e = 1;
            return {
              e,
              name: "limingmin"
            };
          },

          render: function() {
            return <h1>This is my </h1>
          }
        });
        module.exports = Component;
      `;
      test(code, 'age', 11)
    });
  });

  
  describe('ClassExpression', () => {
    it('没有 defaultProps 的情况，创建一个 defaultProps', () => {
      var code = `
        var React = require("React");
        class Component extends React.Component {
        }
        module.exports = Component;
      `;
      test(code, 'age', 11)
    });

    it('有 defaultProps 的情况，创建增加一个 Props', () => {
      var code = `
        var React = require("React");
        class Component extends React.Component {
          static defaultProps = {
            name: "limingmin"
          };
        }
        module.exports = Component;
      `;
      test(code, 'age', 11)
    });
  });
});
