(function (global, _) {

  // Mixins for negotiating between a
  global.BackboneCollection = function (Collection) {

    var mixin = {};

    mixin.initializeCollection = function (models, options) {
      this.collection = new Collection(models, options);
      this.collection.on('add remove reset', this.assignCollection);
    };

    mixin.serializeCollection = function (options) {
      return { collection: this.collection.toJSON(options) };
    };

    mixin.assignCollection = function (options) {
      this.setState(this.serializeCollection(options));
    };

    mixin.fetchCollection = function (options) {
      this.collection.fetch(_.extend({
        success: this.assignCollection,
        error: function () {
          alert('Failed fetching TODOs!');
        }
      }, options));
    };

    return mixin;
  };

})(this, _);

