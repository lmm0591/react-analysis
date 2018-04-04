var docgen = require('./dist/main')

var docs = docgen.parse(`
var React = require("React");
var PropTypes = React.PropTypes;

var defaultProps = {
  foo: true,
};
var propTypes =  {
  /**
   * Example prop description
   */
  foo: PropTypes.bool
};

/**
 * Example component description
 */
var Component = React.createClass({
  displayName: 'ABC',
  propTypes,
  getDefaultProps: function() {
    return defaultProps;
  }
});
module.exports = Component
`);

console.log(docs)