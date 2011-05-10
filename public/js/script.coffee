TrackWords = []

$(document).ready ->
  socket = new io.Socket "localhost", port: 3010
  
  socket.on "message", (message) ->
    $('#messages').prepend("<li>" + message + "</li>")
  
  socket.connect()

  $('#track_button').click ->
    track_words = $('#track_words').val()
    $('#messages').prepend('<hr />')
    $('#messages').prepend('<h1>'+track_words + '</h1>')
    $('#messages').prepend('<hr />')
    $.get('/track?q=' + track_words)
    return false