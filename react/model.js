(function (global, Backbone) {

  // A todo model
  var Todo = global.Todo = Backbone.Model.extend({
    defaults: {
      label: 'Nothing to do'
    },
    toJSON: function () {
      return {
        id    : this.id,
        label : this.attributes.label
      };
    }
  });

  global.Todos = Backbone.Collection.extend({
    url: './todos.json',
    model: Todo
  });

})(this, Backbone);

