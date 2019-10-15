const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) =>  {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
// *********this is causing double talkback messages for some reason...
  //socket.on('talkback', (msg) => {
  //  socket.broadcast.emit('talkback', msg);
//  });
});

http.listen(3000, () => {
  console.log('sever listening on port 3000');
});
