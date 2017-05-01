var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

// Twiiter code
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'Fcnibd8Eese5QWvgAd7wSV5i8',
  consumer_secret: 'Kc1xXA6zrJJVdEcUZlbfd8uV5vGhqBXjEgJSWnbMYSjCJ57Zsy',
  access_token_key: '856614020970930176-eQlzwx45EOfJRWJI54D30l8rv9JjPny',
  access_token_secret: 'iZsjDHF88YGWn2cCuYcEnR3J6yLUMS1GoyuoGfYr71iCC'
});


app.use(bodyParser());

app.post('/',function(req, res, next){
    var txt_folder_name = req.body;
    // console.log("Alex");
    console.log(txt_folder_name);
});

// app.use(express.static('css'));
// app.use(express.static('test'));

// app.use("/css", express.static(__dirname+'/css'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  // console.log(req);
})

app.get('/test.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/test.js'));
  // console.log(req);
})

app.get('/results', function (req, res) {
  var query = req.query.query
  client.get('search/tweets', {q: query}, function(error, tweets, response) {
     var result = tweets
     var text = [];
     var alltweets = result.statuses;
     var alltext = alltweets.map(function(object){
       return object.text;
     });
     console.log(alltext);
    //  DO VISUAL STUFF
  });
  res.sendFile(path.join(__dirname+'/results.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
