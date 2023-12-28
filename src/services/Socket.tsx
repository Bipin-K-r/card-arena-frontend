import io from 'socket.io-client';

export const socket = io('https://cardarena.iugaming.com/', { path: '/api/socket.io' });

const JoinGame = (playerName?: string, gameId?: string) => {
    if (!gameId) {
        gameId = generateHexId(8);
    }
    const sessionId = generateHexId(16); // Generate sessionId
    sessionStorage.setItem('sessionId', sessionId); // Store sessionId in session storage
    socket.emit('joinGame', {
        playerName: playerName,
        gameId: gameId,
        playerSessionId: sessionId
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