// Runs automagically as needed, hopefully
Deps.autorun(function () {
  console.log('Running Deps.autorun');
  Meteor.subscribe('current-trends');
  Meteor.subscribe('trend-time');
  Trends = new Meteor.Collection('trends');
  TrendTime = new Meteor.Collection('trendtime');
});