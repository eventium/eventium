export default (io) => {
  io.on('connection', (socket) => {
    socket.on('new message', (msg) => {
      socket.broadcast.emit('new message', msg);
    });
  });
};
