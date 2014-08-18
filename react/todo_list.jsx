/** @jsx React.DOM */
var TodoList = React.createClass({
  render: function () {
    var todoNodes = this.props.todos.map(function (todo) {
      return (
        <TodoItem key={todo.id} completed={todo.completed}>{todo.label}</TodoItem>
      );
    });
    return (
      <ul>{todoNodes}</ul>
    );
  }
});

