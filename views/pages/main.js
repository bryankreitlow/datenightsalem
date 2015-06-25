if(Meteor.isClient) {
  Template.main.helpers({
    places: function() {
      var filter = Session.get("filter"),
        activityTypeFilter = Session.get("activityTypeFilter"),
        priceFilter = Session.get("priceFilter"),
        cityFilter = Session.get("cityFilter");
      var query = {'$and': []};
      if(filter && filter !== "") {
        query['$and'].push({$or: [{name: {'$regex': filter, $options:'i'}},{description: {'$regex': filter, $options:'i'}}]});
      }
      if(activityTypeFilter && activityTypeFilter !== "") {
        query['$and'].push({activityTypes: {'$in': [activityTypeFilter]}});
      }
      if(cityFilter && cityFilter !== "") {
        query['$and'].push({city: {'$in': [cityFilter]}});
      }
      if(priceFilter && priceFilter !== "") {
        query['$and'].push({price: {'$in': [Number(priceFilter)]}});
      }
      "use strict";
      if(!query['$and'].length) {
        query = {};
      }
      var sortField = Session.get("sortByField");
      var sortDirection = Session.get("sortDirection") === "desc" ? 1 : -1;
      var options = {sort: {}};
      options.sort[sortField] = sortDirection;
      return Places.find(query, options);
    },
    activityTypes: function() {
      var activityTypes = [];
      Places.find({},{fields:{'activityTypes': 1}}).forEach(function(place) {
        activityTypes = activityTypes.concat(place.activityTypes);
      });
      return _.filter(_.uniq(activityTypes).sort(), function(type) {
        if(type !== "") {
          return type;
        }
      });
    },
    prices: function() {
      return pricesOrder;
    },
    placeCities: function() {
      var placeCities = [];
      Places.find({},{fields:{'city': 1}}).forEach(function(place) {
        placeCities = placeCities.concat(place.city);
      });
      return _.filter(_.uniq(placeCities).sort(), function(type) {
        if(type !== "") {
          return type;
        }
      });
    }
  });
}
