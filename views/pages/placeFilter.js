if(Meteor.isClient) {
  Template.placeFilter.events({
    'change .activity': function(event) {
      Session.set("activityTypeFilter", event.target.value);
    },
    'change .city': function(event) {
      Session.set("cityFilter", event.target.value);
    },
    'change .price': function(event) {
      Session.set("priceFilter", event.target.value);
    },
    'change input.filter': function(event) {
      Session.set("filter", event.target.value);
    },
    'submit .filterForm': function(event) {
      event.preventDefault();
      Session.set("activityTypeFilter", event.target.activity.value);
      Session.set("priceFilter", event.target.price.value);
      Session.set("cityFilter", event.target.city.value);
      Session.set("filter", event.target.filter.value);
    }
  });
  Template.placeFilter.helpers({
    typeSelected: function() {
      return (this.toString() === Session.get("activityTypeFilter")) ? "selected": "";
    },
    citySelected: function() {
      return (this.toString() === Session.get("cityFilter")) ? "selected": "";
    },
    displayPrice: function() {
      return priceLookup(this);
    },
    priceSelected: function() {
      return (this.toString() === Session.get("priceFilter")) ? "selected": "";
    }
  });
}
