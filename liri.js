require("dotenv").config();
var config          = require('./keys')
var arg1            = process.argv[2];
var arg2            = process.argv[3];
var Twitter         = require('twitter');


Twitter
// Access to twitter
let myTweets = function () {

    var client = new Twitter({
                            consumer_key: config.twitter.consumer_key,
                            consumer_secret: config.twitter.consumer_secret,
                            access_token_key: config.twitter_access_token_key,
                            access_token_secret: config.twitter_access_token_secret
    });

    // arg2 is your user twitter username
    let username = { screen_name: arg2 }
    //Grabs timeline
    client.get('statuses/user_timeline', username, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            console.log(tweets);
        }
    })
};


let getSong = function () {
    var Spotify = require('node-spotify-api');

    //Access Spotify
    var Spotify = new Spotify({
        id: config.spotify.id,
        secret: config.spotify.secret
    });
    //Song request
    let songTitle = arg2

    //Search song function
    Spotify.search({ type: 'track', query: songTitle }, function (error, data) {

        if (error) {
            return console.log('Error');
        }
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
    })
};


function getMovie() {
    //Access to request
    var request = require("request");
    movieName = process.argv[3]

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    //Grabs movie info using request library
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Here are the movie details, \n"    + "Title: " + JSON.parse(body).Title + "\n"
                                                            + "Plot: " + JSON.parse(body).Plot + "\n"
                                                            + "Actors: " + JSON.parse(body).Actors + "\n"
                                                            + "Year: " + JSON.parse(body).Year + "\n"
                                                            + "Country: " + JSON.parse(body).Country + "\n"
                                                            + "Language: " + JSON.parse(body).Language + "\n"
                                                            + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n"
                                                            + "Rotten Tomatoe's Rating: " + JSON.parse(body).tomatoUserRating + "\n"
            )
        }
    })
};

function getRandom() {
    var fs = require('fs');
  
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if(error){
            console.log(error);
        }
        var dataArr = data.split(",");
        arg1 = dataArr[0]
        arg2 = dataArr[1]
        console.log(data)
    }

)};
//To use multiple words start with quotes "Still have to figure out universal code without having to use quotes"
switch(arg1) {
    case "myTweets":
         myTweets();
         break;
    case "spotify":
         getSong();
         break;
    case "movie":
         getMovie();
         break;
    case "read":
         getRandom();
         break;
}