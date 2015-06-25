Meteor.publish("places", function() {
  return Places.find();
});

Meteor.publish("reviewplaces", function() {
  return ReviewPlaces.find();
});

Meteor.publish("events", function() {
  return Events.find();
});