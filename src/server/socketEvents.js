export default (io) => {
  io.on('connection', (socket) => {
    socket.on('join room', (room) => {
      console.log('socket.io: Joined room:', room);
      socket.join(room);
    });

    socket.on('new message', (msg) => {
      console.log(`socket.io: broadcasting message ${Object.entries(msg)} to room ${msg.channelId}`);
      socket.broadcast.to(msg.channelId).emit('new message', msg);
    });

    socket.on('leave room', (room) => {
      console.log('socket.io: Left room:', room);
      socket.leave(room);
    });
  });
};
