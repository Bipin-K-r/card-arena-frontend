import io from 'socket.io-client';


// socket.on('disconnect', () => {
//     console.log('Disconnected from socket.io server');
// });

// Create an event called 'joinRoom' and emit it to the server
const JoinGame = (roomId?: string) => {
    const socket = io('https://cardarena.iugaming.com/', { path: '/api/socket.io'});

    if (!roomId) {
        roomId = generateHexId(8);
    }
    socket.on('connect', () => {
        console.log('Connected to socket.io server');
        socket.emit('joinGame', { roomId });
        return roomId;
    });
};

const generateHexId = (length: number) => {
    const characters = '0123456789abcdef';
    let hexId = '';
    for (let i = 0; i < length; i++) {
        hexId += characters[Math.floor(Math.random() * characters.length)];
    }
    return hexId;
};

export default JoinGame;
