var blacklist = require('blacklist');
var React = require('react');
var Element = require('./element');

module.exports = React.createClass({
  displayName: 'ModelForm',

  getDefaultProps() {
    return {
      model: {
        attrs: [],
        values: {}
      }
    };
  },

  renderAttr(attr, i) {
    var model = this.props.model;
    var values = model.values || {};

    if(attr.name === model.user) return null;

    return (
      <Element
        key={i}
        attr={attr}
        value={values[attr.name]}
        onChange={this.props.onChange}
      />
    );
  },

  render() {
    var model = this.props.model;
    var attrs = model.attrs;
    var props = blacklist(this.props, 'onChange', 'children');

    return (
      <form {... props}>
        {attrs.map(this.renderAttr)}
        <input name="_model" type="hidden" value={model.table}/>
        {this.props.children}
      </form>
    );
  }
});
