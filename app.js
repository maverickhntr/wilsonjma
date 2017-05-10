var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var affectimo = require('affectimo');
var fs = require('fs');
var serve = require('express-static');

// add object to store info in
var allData = {};

// Twiiter code
var Twitter = require('twitter');

// Twitter authentication

var client = new Twitter({
  consumer_key: 'Fcnibd8Eese5QWvgAd7wSV5i8',
  consumer_secret: 'Kc1xXA6zrJJVdEcUZlbfd8uV5vGhqBXjEgJSWnbMYSjCJ57Zsy',
  access_token_key: '856614020970930176-eQlzwx45EOfJRWJI54D30l8rv9JjPny',
  access_token_secret: 'iZsjDHF88YGWn2cCuYcEnR3J6yLUMS1GoyuoGfYr71iCC'
});

// Post

app.post('/',function(req, res, next){
    var txt_folder_name = req.body;
    console.log(txt_folder_name);
});

// Send index.html file to browser

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Send test.js file to browser

app.get('/test.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/test.js'));
});

// express middleware which writes JSON file containing affect score and intensity score and sends that file to the browser

app.use('/results', function (req, res, next) {
  var query = req.query.query
  client.get('search/tweets', {q: query, count: 100}, function(error, tweets, response) {
     var result = tweets
     var alltweets = result.statuses;
     var alltext = alltweets.map(function(object){
       return object.text;
     });
     var text = alltext;
     var affectimo_text = affectimo(text);
     allData.affect = affectimo_text.AFFECT;
     allData.intensity = affectimo_text.INTENSITY;
   })
   next();
},

function (req, res, next){
        fs.writeFileSync(__dirname + '/public/result.json', JSON.stringify(allData));
         next()
       },
          function (req, res, next){
           app.use(serve(__dirname + '/public'));
           next()
       },

function (req, res, next){

res.sendFile(path.join(__dirname+'/results.html'));

});


// configure server

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
