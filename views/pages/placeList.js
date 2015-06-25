var updateSortDirection = function() {
  if(Session.get("sortDirection") === "desc") {
    Session.set("sortDirection", "asc");
  } else {
    Session.set("sortDirection", "desc");
  }
};

if(Meteor.isClient) {
  Template.placeList.events({
    'click td.sortByName': function(event) {
      if(Session.get("sortByField") === "name") {
        updateSortDirection();
      } else {
        Session.set("sortByField", "name");
        Session.set("sortDirection", "desc");
      }
    },
    'click td.sortByPrice': function(event) {
      if(Session.get("sortByField") === "price.0") {
        updateSortDirection();
      } else {
        Session.set("sortByField", "price.0");
        Session.set("sortDirection", "desc");
      }
    },
    'click td.sortByDistance': function(event) {
      if(Session.get("sortByField") === "distance") {
        updateSortDirection();
      } else {
        Session.set("sortByField", "distance");
        Session.set("sortDirection", "desc");
      }
    },
    'click td.sortByCity': function(event) {
      if(Session.get("sortByField") === "city.0") {
        updateSortDirection();
      } else {
        Session.set("sortByField", "city.0");
        Session.set("sortDirection", "desc");
      }
    }
  });
  Template.placeList.helpers({
    getSortClasses: function(field) {
      if(Session.get("sortByField") === field) {
        if(Session.get("sortDirection") && Session.get("sortDirection") !== undefined) {
          if(Session.get("sortDirection") === "desc") {
            return "fa fa-fw fa-sort-desc";
          } else {
            return "fa fa-fw fa-sort-asc";
          }
        } else {
          return "fa fa-fw fa-sort-desc";
        }
      } else {
        return "fa fa-fw fa-sort";
      }
    }
  });
}
