(function (global, Backbone) {

  var todos = [
    {
      "id": 1,
      "label": "Backbone",
      "completed": true
    },
    {
      "id": 2,
      "label": "React",
      "completed": true
    },
    {
      "id": 3,
      "label": "Profit"
    }
  ];

  // A todo model
  var Todo = global.Todo = Backbone.Model.extend({
    toJSON: function () {
      return {
        id        : this.id,
        label     : this.attributes.label,
        completed : this.attributes.completed
      };
    }
  });

  var Todos = global.Todos = Backbone.Collection.extend({
    url: './todos.json',
    model: Todo,
    localStorage: new Backbone.LocalStorage('todos'),
    useFixture: function () {
      this.localStorage._clear();
      this.reset(todos);
      this.forEach(function (todo) {
        todo.save();
      });
    }
  });

  global.todoStore = new Todos();

})(this, Backbone);

