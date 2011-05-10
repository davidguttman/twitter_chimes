(function() {
  var TrackWords;
  TrackWords = [];
  $(document).ready(function() {
    var socket;
    socket = new io.Socket("localhost", {
      port: 3010
    });
    socket.on("message", function(message) {
      return $('#messages').prepend("<li>" + message + "</li>");
    });
    socket.connect();
    return $('#track_button').click(function() {
      var track_words;
      track_words = $('#track_words').val();
      $('#messages').prepend('<hr />');
      $('#messages').prepend('<h1>' + track_words + '</h1>');
      $('#messages').prepend('<hr />');
      $.get('/track?q=' + track_words);
      return false;
    });
  });
}).call(this);
