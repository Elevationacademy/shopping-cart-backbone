var ItemModel = Backbone.Model.extend({
  // TODO: give our model some defaults
});

var ItemCollection = Backbone.Collection.extend({
  model: ItemModel
});

var ItemView = Backbone.View.extend({
  className: 'item',

  template: Handlebars.compile($('#item-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    
    return this;
  }
});

var AppModel = Backbone.Model.extend({
  defaults: {
    cart: new ItemCollection(),
    show_cart: false,
    total: 0
  },

  initialize: function () {
    // invoke _calculateTotal when necessary
  },

  _calculateTotal: function () {
    // TODO: Calculate the total of all the items in the collection
  }
});

var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .view-cart': 'toggleCart',
    'click .add-to-cart': 'addItem',
    'click .clear-cart': 'clearCart'
  },

  initialize: function () {
    // array for keeping track of all our item subviews so we can remove them later
    this.itemViews = [];

    this.$shoppingCart = this.$('.shopping-cart');
    this.$cartList = this.$('.cart-list');
    this.$total = this.$('.total');

    this.listenTo(this.model.get('cart'), 'add', this.renderItem);
    this.listenTo(this.model, 'change:show_cart', this.renderShowCart);
    this.listenTo(this.model, 'change:total', this.renderTotal);

    this.renderShowCart();
  },

  toggleCart: function () {
    // TODO: Toggle the cart
  },

  clearCart: function () {
    // loop through all the view and call remove on them
    for (var i = 0; i < this.itemViews.length; i += 1) {
      this.itemViews[i].remove();
    }

    // empty out the 'cart' by resetting the collection
    this.model.get('cart').reset();
  },

  addItem: function (e) {
    // TODO: Add a new item to the cart
  },

  renderShowCart: function () {
    // TODO: Toggle the show class on the cart div
  },

  renderItem: function (item) {
    var view = new ItemView({ model: item });

    // push our view in the itemViews array for later removal
    this.itemViews.push(view);


    this.$cartList.append(view.render().el);
  },

  renderTotal: function () {
    this.$total.html(this.model.get('total'));
  }
});

var appModel = new AppModel();
var appView = new AppView({model: appModel});