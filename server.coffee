# require in our libraries
sys           = require 'sys'
_             = require 'underscore'
io            = require 'socket.io'
express       = require 'express'
{TwitterNode} = require 'twitter-node'


# create our express webserver
app = express.createServer()

# expose our public directory
app.configure ->
  app.use express.static(__dirname + '/public')

app.get '/track', (req, res) ->
  twitter.trackKeywords = req.query.q.split(", ")
  twitter.stream()
  res.redirect '/'

# start the server on port 3010
app.listen 3010

# attach socket.io to the server
socket = io.listen app



# create our interface to the Twitter Streaming API
twitter = new TwitterNode
  user: 'username'
  password: 'password'
  track: []

# tell our interface what to do when a tweet comes in
twitter.addListener 'tweet', (tweet) ->
  # print it to the screen =)
  console.log tweet.text
  
  # not only will we print it, we'll broadcast it too.
  socket.broadcast tweet.text

twitter.addListener 'error', (error) ->
  console.log error.message

# start it up
twitter.stream()