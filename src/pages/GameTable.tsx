import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket, StartGame } from '../services/Socket';

interface Player {
  id: string;
  name: string;
  cards: Card[];
  sessionId: string;
}

interface Card {
  suit: string;
  rank: string;
}

enum GameStatus {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTING_SET = 'STARTING_SET',
  CALLING_HANDS = 'CALLING_HANDS',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

const Player: React.FC<{ player: Player, idx: number, totalPlayer: number }> = ({ player, idx, totalPlayer }) => {
  const calculatePosition = (index: number, totalPlayers: number) => {
    const radiusX = window.innerWidth * 0.4; // Adjust the X radius as needed (40% of the screen width)
    const radiusY = window.innerHeight * 0.3; // Adjust the Y radius as needed (30% of the screen height)
    const angle = (2 * Math.PI * index) / totalPlayers;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    return { x, y };
  };

  return (
    <div
      key={player.id}
      className="absolute flex justify-center items-center"
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(${calculatePosition(idx, totalPlayer).x}px, ${calculatePosition(idx, totalPlayer).y}px)`,
      }}
    >
      <div className="bg-white rounded-full p-2 shadow-md">
        <span className="text-gray-800">{player.name}</span>
        <div className="mt-2">
          {player.cards.map((card, index) => (
            <div key={index} className="text-gray-600">
              {player.sessionId === sessionStorage.getItem('sessionId') ? 
                  <img
                  src={`/cards/${card.rank}_${card.suit}.png`}
                  alt={`${card.rank} of ${card.suit}`}
                  style={{ height: '100px', objectFit: 'contain' }}
                /> : 'Unknown'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GameTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.WAITING_FOR_PLAYERS);

  const shouldRedirect = sessionStorage.getItem('sessionId') === null;
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to the stateUpdate event
    socket.on('stateUpdate', (data) => {
      console.log('Received stateUpdate:', data);
      console.log('Players:', data.players);
      if (data) {
        setPlayers(JSON.parse(data).players);
        setGameStatus(JSON.parse(data).gameStatus);
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('stateUpdate');
    };
  }, []);

  const { gameId } = useParams();

  useEffect(() => {
    if (shouldRedirect) {
      navigate(`/game/${gameId}/join`);
    } else {
      socket.emit('joinGame', {
        playerName: sessionStorage.getItem('playerName'),
        gameId: gameId,
        playerSessionId: sessionStorage.getItem('sessionId')
      });
    }
  }, [shouldRedirect, navigate, gameId]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="w-96 h-48 bg-gray-400 rounded-full flex flex-col justify-center items-center">
        {players.map((player, index) => (
          <Player key={player.id} player={player} idx={index} totalPlayer={players.length} />
        ))}
        {gameStatus === GameStatus.WAITING_FOR_PLAYERS && (
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => StartGame(gameId, sessionStorage.getItem('sessionId') || '')}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameTable;
