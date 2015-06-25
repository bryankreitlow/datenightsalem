OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId()) {
      this.render("unauthorized");
    } else {
      this.next();
    }
  }
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', function() {
  Session.set("DocumentTitle","Date Night Salem");
  this.render('main');
}, {name: "Main", waitOn: function() {
  "use strict";
  return [
    Meteor.subscribe("places")
  ];
}});

Router.route('/events', function() {
  Session.set("DocumentTitle","Date Night Salem - Events");
  this.render('events');
}, {name: "Events", waitOn: function() {
  "use strict";
  return [
    Meteor.subscribe("events")
  ];
}});

Router.route('/addPlace', function() {
  Session.set("DocumentTitle","Date Night Salem - Add Place");
  this.render('addPlace');
}, {name: 'addPlace', waitOn: function() {
  "use strict";
  return [
    Meteor.subscribe("places")
  ];
}});

// Admin Routes
Router.route('/reviewPlaces', function() {
  Session.set("DocumentTitle","Review Submissions");
  this.render('reviewPlaces');
}, {name: 'ReviewSubmissions', waitOn: function() {
  "use strict";
  return [
    Meteor.subscribe("reviewplaces")
  ];
}});

Router.onBeforeAction(OnBeforeActions.loginRequired, {only:'ReviewSubmissions'});
