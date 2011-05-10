(function() {
  var TwitterNode, app, express, io, socket, sys, twitter, _;
  sys = require('sys');
  _ = require('underscore');
  io = require('socket.io');
  express = require('express');
  TwitterNode = require('twitter-node').TwitterNode;
  app = express.createServer();
  app.configure(function() {
    return app.use(express.static(__dirname + '/public'));
  });
  app.get('/track', function(req, res) {
    twitter.trackKeywords = req.query.q.split(", ");
    twitter.stream();
    return res.redirect('/');
  });
  app.listen(3010);
  socket = io.listen(app);
  twitter = new TwitterNode({
    user: 'username',
    password: 'password',
    track: []
  });
  twitter.addListener('tweet', function(tweet) {
    console.log(tweet.text);
    return socket.broadcast(tweet.text);
  });
  twitter.addListener('error', function(error) {
    return console.log(error.message);
  });
  twitter.stream();
}).call(this);
