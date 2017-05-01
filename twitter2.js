var Twitter = require('twitter');
var fs = require('fs');

var client = new Twitter({
  consumer_key: 'Fcnibd8Eese5QWvgAd7wSV5i8',
  consumer_secret: 'Kc1xXA6zrJJVdEcUZlbfd8uV5vGhqBXjEgJSWnbMYSjCJ57Zsy',
  access_token_key: '856614020970930176-eQlzwx45EOfJRWJI54D30l8rv9JjPny',
  access_token_secret: 'iZsjDHF88YGWn2cCuYcEnR3J6yLUMS1GoyuoGfYr71iCC'
});

var query = 'Kanye'
var result = 'placeholder'
client.get('search/tweets', {q: query}, function(error, tweets, response) {
   var result = tweets
   var text = [];
   var alltweets = result.statuses;
   var alltext = alltweets.map(function(object){
     return object.text;
   });
   console.log(alltext);
});





/*var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});*/
