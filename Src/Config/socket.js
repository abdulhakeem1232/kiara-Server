const socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
  // io = socketIo(server, {
  //   cors: {
  //     origin: 'http://localhost:5173', 
  //     credentials: true
  //   }
  // });

const io = require('socket.io')(server, {
  cors: {
    origin: 'https://kiara-global-service.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
});


  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

  });
};

const emitClientDataUpdate = (updatedClientData) => {
  console.log('client data updated checking');
  io.emit('clientDataUpdated', updatedClientData);
    console.log('client data updated emmited');
    
};

const emitUserDataUpdate = (updatedUserData) => {
  if (io) {
    io.emit('userDataUpdated', updatedUserData); 
  }
};

const emitUserDeleted = (userId) => {
  if (io) {
    io.emit('userDeleted', userId); 
  }
};

const emitClientDeleted = (clientId) => {
  if (io) {
    io.emit('clientDeleted', clientId); 
  }
};

module.exports = {
  initializeSocket,
  emitClientDataUpdate,
  emitUserDataUpdate,
  emitUserDeleted,
  emitClientDeleted
};
