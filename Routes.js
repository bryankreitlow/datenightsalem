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