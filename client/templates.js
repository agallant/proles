Template.trending.trends = function() {
  //console.log('Viewing trends');
  // First want to check if >5mins so we wait
  var trend_time = TrendTime.findOne();
  if (typeof trend_time === 'undefined' ||
      Date.now() - trend_time.last_insert_stamp >= 300000) {
    // TODO consider other ways to show loading message
    return [{name: "Loading trends..."}];
  }
  // Trends are loaded!
  return Trends.find();
};

Template.trending.trendtime = function() {
  var trend_time = TrendTime.findOne();
  if (typeof trend_time !== 'undefined') {
    // Seems to return newer on client side than server
    return new Date(trend_time.last_insert_stamp);
  }
};
