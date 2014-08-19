window.addEventListener('polymer-ready', function (e) {

  var todoListEl = document.createElement('todo-list'),
      todoSubmitEl = document.createElement('todo-form');

  // Add models to the list element as they're added to the collection
  todoStore.on('change add remove reset', function (m) {
    todoListEl.reset(todoStore.toJSON());
  });

  // A new todo has been submitted! If it's valid (it is) we can trigger a
  // view update by adding it to the collection
  todoSubmitEl.addEventListener('submit', function (e) {
    todoStore.create({ label: e.target.label });
  });

  // A todo has been completed! The view is already updated to reflect this;
  // we just need to update its `completed` status.
  todoListEl.addEventListener('completed', function (e) {
    todoStore.get(e.detail.id).save({ completed: true });
  });

  // Create a list element
  document.body.appendChild(todoListEl);
  document.body.appendChild(todoSubmitEl);

  todoStore.fetch();
});

