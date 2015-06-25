if(Meteor.isClient) {
  Template.placeListItem.helpers({
    listCities: function(cities) {
      return cities.join(", ");
    },
    displayPrice: function(price) {
      return priceLookup(price);
    }
  });
}
