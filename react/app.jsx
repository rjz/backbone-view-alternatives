/** @jsx React.DOM */

// Example: React on the outside, Backbone on the inside

var TodoView = React.createClass({
  getInitialState: function () {
    return _.result(Todo.prototype, 'defaults');
  },
  render: function() {
    return (
      <li>
        <input type="checkbox" id={"todo-" + this.props.key} />
        <label htmlFor={"todo-" + this.props.key}>{this.props.children}</label>
      </li>
    );
  }
});

var TodoListView = React.createClass({
  render: function () {
    var todoNodes = this.props.todos.map(function (todo) {
      return (
        <TodoView key={todo.id}>{todo.label}</TodoView>
      );
    });
    return (
      <ul>{todoNodes}</ul>
    );
  }
});

var TodoSubmitView = React.createClass({

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

var TodoAppView = React.createClass({

  // Include all of the `*Collection` methods wrapping an instance of the
  // `TODOS` collection.
  mixins: [ BackboneCollection(Todos) ],

  // Set up `this.collection` and return its serialized value as initial state
  getInitialState: function () {
    this.initializeCollection();
    return this.serializeCollection();
  },

  // Retrieve the collection from the server
  componentDidMount: function () {
    this.fetchCollection();
  },

  todoCreated: function (attrs) {
    this.collection.create(attrs);
  },

  render: function () {
    return (
      <div>
        <TodoListView todos={this.state.collection}></TodoListView>
        <TodoSubmitView onSubmit={this.todoCreated}></TodoSubmitView>
      </div>
    );
  }
});

React.renderComponent(
  <TodoAppView></TodoAppView>,
  document.getElementById('root')
);

