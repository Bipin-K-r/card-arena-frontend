import io, {connect} from 'socket.io-client';

const socket = io.connect('http://localhost:8080/', { path: '/api/socket.io' });

// Create an event called 'joinRoom' and emit it to the server
const JoinGame = (playerName?: string, gameId?: string) => {
    if (!gameId) {
        gameId = generateHexId(8);
    }
    socket.emit('joinGame', {
        playerName: playerName,
        gameId: gameId
    });
    return gameId;
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
