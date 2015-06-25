Meteor.startup(function () {
  sAlert.config({
    effect: 'genie',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0
  });

  Session.setDefault("sortByField", "name");
  Session.setDefault("sortDirection", "desc");
});