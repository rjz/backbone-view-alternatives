/** @jsx React.DOM */

var BackboneCollection = {

  bindCollection: function (collectionRef) {
    var boundAssignment = this.assignCollection.bind(this, collectionRef);
    collectionRef.on('change add remove reset', boundAssignment);
  },

  unbindCollection: function (collectionRef) {
    collectionRef.off();
  },

  serializeCollection: function (collectionRef, options) {
    return { collection: collectionRef.toJSON(options) };
  },

  assignCollection: function (collectionRef, options) {
    this.setState(this.serializeCollection(collectionRef, options));
  }
};

// Example: React on the outside, Backbone on the inside
var TodoApp = React.createClass({

  // Include all of the `*Collection` methods wrapping an instance of the
  // `TODOS` collection.
  mixins: [ BackboneCollection ],

  // Set up `this.collection` and return its serialized value as initial state
  getInitialState: function () {
    return this.serializeCollection(todoStore);
  },

  componentDidMount: function () {
    this.bindCollection(todoStore);
  },

  // Retrieve the collection from the server
  componentWillUnmount: function () {
    this.unbindCollection(todoStore);
  },

  fetchCollection: function () {
    todoStore.fetch();
  },

  todoCreated: function (attrs) {
    todoStore.create(attrs);
  },

  useFixture: function () {
    todoStore.useFixture();
  },

  render: function () {
    return (
      <div>
        <a href="#" onClick={this.useFixture}>Reset TODOs</a><br />
        <a href="#" onClick={this.fetchCollection}>Fetch existing TODOs</a>
        <TodoList todos={this.state.collection}></TodoList>
        <TodoSubmit onSubmit={this.todoCreated}></TodoSubmit>
      </div>
    );
  }
});

React.renderComponent(
  <TodoApp></TodoApp>,
  document.getElementById('root')
);

