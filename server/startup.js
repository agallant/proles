Meteor.startup(function () {
  // AFINN-based sentiment: https://github.com/thisandagain/sentiment
  // Set up Twitter API
  Twit = new Twit({
    // Put your Twitter API access keys/tokens here
    consumer_key: Meteor.settings.twitter.consumer_key,
    consumer_secret: Meteor.settings.twitter.consumer_secret,
    access_token: Meteor.settings.twitter.access_token,
    access_token_secret: Meteor.settings.twitter.access_token_secret
  });
  // Set up MongoDB collections
  Trends = new Meteor.Collection('trends');
  TrendTime = new Meteor.Collection('trendtime');
  // Publish all trend data for client availability
  Meteor.publish('current-trends', function () {
    return Trends.find();
  });
  Meteor.publish('trend-time', function() {
    return TrendTime.find();
  });
  getTrends();
  // Refresh trends every 5 mins as that's as often as they change
  Meteor.setInterval(getTrends, 300000);
});
