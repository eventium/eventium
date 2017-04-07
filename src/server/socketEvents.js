export default (io) => {
  io.on('connection', (socket) => {
    socket.on('join channel', (channel) => {
      socket.join(channel);
    });

    socket.on('new message', (msg) => {
      console.log(`socket.io: event: "new message" received: ${Object.entries(msg)}`);
      socket.broadcast.to(msg.channelId).emit('new message', msg);
    });
  });
};
