if(Meteor.isClient) {
  Template.events.helpers({
    calendarOptions: {
      events: function(start, end, timezone, callback) {
        var events = [];
        var dbEvents = Events.find();
        dbEvents.forEach(function(event) {
          var displayEvent = {};
          displayEvent = _.merge(event, {title: event.title + ((event.price) ? ' ($' + event.price + ')' : '')});
          events.push(displayEvent);
        });
        callback(events);
      }
    }
  });
}