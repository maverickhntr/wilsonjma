var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var affectimo = require('affectimo');
var fs = require('fs');
var serve   = require('express-static');
var mkdirp = require('mkdirp');
var pause = require('connect-pause');
var allData = {};

app.use(pause(500));

mkdirp(__dirname + '/public', function(err) {
   console.log("path exists unless there was an error")
});

// console.log(newai);
// Twiiter code
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'Fcnibd8Eese5QWvgAd7wSV5i8',
  consumer_secret: 'Kc1xXA6zrJJVdEcUZlbfd8uV5vGhqBXjEgJSWnbMYSjCJ57Zsy',
  access_token_key: '856614020970930176-eQlzwx45EOfJRWJI54D30l8rv9JjPny',
  access_token_secret: 'iZsjDHF88YGWn2cCuYcEnR3J6yLUMS1GoyuoGfYr71iCC'
});


app.post('/',function(req, res, next){
    var txt_folder_name = req.body;
    console.log(txt_folder_name);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/test.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/test.js'));
});

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




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
