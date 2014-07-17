Meteor.startup(function () {
  // AFINN-based sentiment: https://github.com/thisandagain/sentiment
  Sentiment = Meteor.require('sentiment');
  // Set up Twitter API
  Twit = new TwitMaker({
    // Put your Twitter API access keys/tokens here
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
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
});