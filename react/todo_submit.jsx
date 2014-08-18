/** @jsx React.DOM */
var TodoSubmit = React.createClass({

  onSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmit({
      label: this.refs.todo.getDOMNode().value.trim()
    });
    this.refs.todo.getDOMNode().value = '';
  },

  render: function () {
    return (
      <form onSubmit={this.onSubmit}>
        <input pattern=".{1,}" required ref="todo" type="text" placeholder="Eat a peach..." />
        <button>Add TODO</button>
      </form>
    );
  }
});

