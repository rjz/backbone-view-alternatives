window.addEventListener('polymer-ready', function(e) {

  // A simple model; uses the `cid` instead of the `id` to avoid
  // having to deal with persistence. For now.
  var Todo = Backbone.Model.extend({
    toJSON: function () {
      return _.defaults({ id: this.cid }, this.attributes);
    }
  });

  var Todos = Backbone.Collection.extend({
    model: Todo
  });

  // Create a todo list
  var todos = new Todos();

  // Create a list element
  var todoListEl = document.querySelector('demo-todo-list');

  // Add models to the list element as they're added to the collection
  todos.on('add', function (m) {
    todoListEl.add(m.toJSON());
  });

  // A new todo has been submitted! If it's valid (it is) we can trigger a
  // view update by adding it to the collection
  todoListEl.addEventListener('itemRequest', function (e) {

    // `create` could be used to persist
    todos.add({ label: e.detail.label });
  });

  // A todo has been completed! The view is already updated to reflect this;
  // we simply need to `remove` the model from the collection.
  todoListEl.addEventListener('completed', function (e) {

    // find the model by the event id
    var m = todos.get(e.detail.id);

    // `destroy` could be used to persist
    todos.remove(m);
  });

  // Prepopulate the list with a few things to do
  [
    { label: 'Reach for the sky' },
    { label: 'Win, lose or draw' }
  ].forEach(todos.add.bind(todos));
});

