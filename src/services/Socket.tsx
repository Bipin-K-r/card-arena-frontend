import io from 'socket.io-client';

// This is not working in production
// export const socket = io(process.env.NODE_ENV === 'production' ? 'https://cardarena.iugaming.com' : 'http://localhost:8080/', { path: '/api/socket.io', transports: ['websocket'] });
// export const socket = io('https://cardarena.iugaming.com', { path: '/api/socket.io', transports: ['websocket'] });
export const socket = io('http://localhost:8080', { path: '/api/socket.io', transports: ['websocket'] });


const JoinGame = (playerName?: string, gameId?: string) => {
    if (!gameId) {
        gameId = generateHexId(8);
    }
    const sessionId = generateHexId(16); // Generate sessionId
    sessionStorage.setItem('sessionId', sessionId); // Store sessionId in session storage
    sessionStorage.setItem('playerName', playerName || ''); // Store playerName in session storage
    sessionStorage.setItem('gameId', gameId); // Store gameId in session storage
    // Todo: Review with @Yogesh
    // Moved this to Join Game Table to run it on refresh as well
    // socket.emit('joinGame', {
    //     playerName: playerName,
    //     gameId: gameId,
    //     playerSessionId: sessionId
    // });
    return gameId;
};


const StartGame = (gameId?: string, sessionId?: string) => {
    socket.emit('startGame', {
        gameId: gameId,
        playerSessionId: sessionId
    });
};

const CallHandsGame = (hands?:number) => {
    socket.emit('callHands', {
        gameId: sessionStorage.getItem('gameId'),
        playerSessionId: sessionStorage.getItem('sessionId'),
        handsCalled: hands
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

export { JoinGame, StartGame , CallHandsGame};