Template.trending.trends = function() {
  //console.log('Viewing trends');
  return Trends.find();
}

Template.trending.trendtime = function() {
  //console.log(TrendTime.findOne());
  var trend_time = TrendTime.findOne();
  if (typeof trend_time !== 'undefined') {
    // Seems to return newer on client side than server
    return Date(trend_time.last_insert_stamp);
  } else {
    return 'N/A';
  }
}