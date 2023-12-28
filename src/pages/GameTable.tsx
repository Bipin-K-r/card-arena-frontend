import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../services/Socket';

interface Player {
  id: string;
  name: string;
}

const GameTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const shouldRedirect = sessionStorage.getItem('sessionId') === null;
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to the stateUpdate event
    socket.on('stateUpdate', (data) => {
      console.log('Received stateUpdate:', data);
      console.log('Players:', data.players);
      if (data) {
        setPlayers(JSON.parse(data).players);
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
    <div className="relative w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {players.map((player) => (
        <div key={player.id} className="w-full h-full bg-gray-400">
          {player.name}
        </div>
      ))}
      {/* 
      Todo: Start Game button for the first user
      
      socker.emit('startGame', {})

      */}
      
    </div>
  );
};

export default GameTable;
