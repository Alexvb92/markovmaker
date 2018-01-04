// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var Promise = require("bluebird");
var Twitter =  require('twitter');
var fs = Promise.promisifyAll(require('fs'))
var exec = require('child_process').exec
var spawn = require('child_process').spawn
var py = spawn('python', ['myfirstpy.py'])
var resdata;
var didrun1;
var didrun2;
var stdout1;
var keys = require('./keys.js')

// need to echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
//for linux system, otherwise get ENOSPC https://stackoverflow.com/questions/22475849/node-js-error-enospc
// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 4000; // Sets an initial port. We'll use this later in our listener

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Serve files created by create-react-app.
app.use(express.static("client/build"));


app.post("/markov", function(req, res) {

  console.log(req.body.user1)
  console.log(req.body.user2)
  var user1 = req.body.user1;
  var user2 = req.body.user2;
  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });
  var tweetstxt = [];
  var tweetstxt1 = [];
  var params = {screen_name: user1, 'count': 100};
  var params2 = {screen_name: user2, 'count': 100};

  function sender() {
    res.send(arrayout)
  }
  function pyreader(cb) {
    exec('python myfirstpy.py', function(err, stdout, stderr) {
      console.log('read file', stdout)
      stdout1 = stdout.replace(/ ,/g, ' ')
      arrayout = stdout1.split("_5 ")
      arrayout.shift()
      cb(arrayout)
    })
  }

  function getter(params) {
    return new Promise(function( resolve, reject) {
      //sending our request to the twitter api
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
       for (i=0; i<tweets.length; i++){
         tweetstxt.push(tweets[i].text + ' ');
       }
        console.log("markov.txt was updated!");
        client.get('statuses/user_timeline', params2, function(error, tweets, response) {
          for (i=0; i<tweets.length; i++){
            tweetstxt1.push(tweets[i].text + ' ');
          }
          //writing the api response to a text file for the python bot to do work on
          fs.writeFileAsync('markov.txt', tweetstxt, {}).then(function() {
            fs.appendFile('markov.txt', tweetstxt1, function(err) {
             // If the code experiences any errors it will log the error to the console.
              if (err) {
                return console.log(err);
              }
            })
          })
          .then(function () {
            //running the python script
            exec('python myfirstpy.py', function(err, stdout, stderr) {
              didrun1 = user1
              didrun2 = user2
              stdout1 = stdout.replace(/ ,/g, ' ')
              arrayout = stdout1.split("_5 ")
              arrayout.shift()
              resolve(arrayout)
            })
          })
          console.log("markov.txt was apended!");
        });
      });
    });
  }
  //checking to see if query has changed so we dont run our twitter api call on every search
  if (didrun1 === user1 && didrun2 === user2) {
    pyreader(sender);
  } else {
    getter(params).then(function(tweetstxt){
      res.send(arrayout)
    });
  }
})

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  if ( process.env.NODE_ENV === 'production' ) {
    res.sendFile(__dirname + "/client/build/index.html");
  } else {
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

// -------------------------------------------------
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
