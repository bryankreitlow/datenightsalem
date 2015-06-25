if(Meteor.isClient) {
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
