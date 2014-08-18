/** @jsx React.DOM */
var TodoItem = React.createClass({
  onChange: function () {
    var completed = this.refs.completed.getDOMNode().checked;
    todoStore.get(this.props.key).save({ completed: completed });
  },
  render: function() {
    return (
      <li>
        <input type="checkbox" ref="completed" checked={this.props.completed} disabled={this.props.completed} onChange={this.onChange} id={"todo-" + this.props.key} />
        <label htmlFor={"todo-" + this.props.key}>{this.props.children}</label>
      </li>
    );
  }
});

