import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../services/socket';

interface Player {
  id: string;
  name: string;
}

const GameTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const history = useHistory();

  const shouldRedirect = sessionStorage.getItem('sessionId') === null;

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

  useEffect(() => {
    if (shouldRedirect) {
      history.push(`/game/:gameid/join`);
    }
  }, [shouldRedirect, history]);

  return (
    <div className="relative w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {players.map((player) => (
        <div key={player.id} className="w-full h-full bg-gray-400">
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default GameTable;
