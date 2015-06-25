ReviewPlaces = new Meteor.Collection("reviewplaces");

ReviewPlaces.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});