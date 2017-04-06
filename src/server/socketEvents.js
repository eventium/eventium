export default (io) => {
  io.on('connection', (socket) => {
    socket.on('new message', (msg) => {
      console.log(`socket.io: event: "new message" received: ${Object.entries(msg)}`);
      socket.broadcast.emit('new message', msg);
    });
  });
};
