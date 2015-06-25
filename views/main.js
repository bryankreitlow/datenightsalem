Meteor.startup(function () {
  Deps.autorun(function () {
    if(Meteor.isClient) {
      document.title = Session.get("DocumentTitle");
    }
  });
});