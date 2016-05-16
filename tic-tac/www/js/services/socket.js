app.factory('socket', function(socketFactory) {
  //create socket and connect to http://
  var ioSocket = io.connect('http://');

  mySocket = socketFactory({
    ioSocket = myIoSocket
  });
  return mySocket;
})
