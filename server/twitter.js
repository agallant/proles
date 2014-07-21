// Methods for calling Twitter API using twit package
getTweets = function(i, trend_data) {
  return function() {
    //console.log('getting tweets');
    Twit.get(
      'search/tweets', {q: trend_data[0].trends[i].query,  count: 100},
      Meteor.bindEnvironment(function(err, tweet_data, response) {
        trend_data[0].trends[i]['tweets'] = tweet_data['statuses'];
        // Join all the tweets together to calculate their sentiment
        var tweet_text = tweet_data.statuses.map(function(t) {
          return t.text;
        }).join(' ');
        var tweet_sentiment = Sentiment(tweet_text);
        // Sentiment of all the tweets divided by # tweets to scale
        trend_data[0].trends[i].sentiment = tweet_sentiment['score'] / 100;
        // For now just returning 20 distinct keywords, TODO: something smarter
        var keywords = tweet_sentiment.words.filter(function(elem, pos, self) {
          return self.indexOf(elem) === pos;
        }).slice(0, 20);  // without 0, takes 20 *last* not first
        trend_data[0].trends[i].keywords = keywords;
        Trends.insert(trend_data[0].trends[i]);
      })
    );
  }
};

getTrends = function() {
  return function() {
    //console.log('getting trends');
    Twit.get(
      'trends/place', {id: '23424977', exclude: 'hashtags'},
      Meteor.bindEnvironment(function(err, trend_data, response) {
        Trends.remove({});  // remove old trends, we only care about fresh
        // Update the time last inserted
        TrendTime.remove({});
        TrendTime.insert({last_insert_stamp: Date.parse(trend_data[0].as_of)});
        console.log('INSERTED: ' + trend_data[0].as_of);
        // Find tweets about the trend for further (sentiment) analysis
        for (var i in trend_data[0].trends) {
          getTweets(i, trend_data)();  // in closure so i actually iterates
        }
      })
    );
  }
}();
