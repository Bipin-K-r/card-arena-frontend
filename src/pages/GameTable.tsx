import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket, StartGame } from '../services/Socket';
import Player from '../components/Player';
import Cards from '../components/Cards';
import './GameTable.css';

enum GameStatus {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTING_SET = 'STARTING_SET',
  CALLING_HANDS = 'CALLING_HANDS',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

const GameTable: React.FC = () => {
  const [game,setGame] = useState<any>();
  const shouldRedirect = sessionStorage.getItem('sessionId') === null;
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    socket.on('stateUpdate', (gameData) => {
      if (gameData) {
        console.log('Received stateUpdate:', JSON.parse(gameData));
        setGame(JSON.parse(gameData));
        console.log('Game:', game);
      }
    });

    return () => {
      socket.off('stateUpdate');
    };
  }, []);

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
        <div className="relative w-full h-screen flex justify-center items-center" style={{ backgroundImage: "url(wall.png)" }}>
          <div className="w-96 h-48 bg-gray-400 rounded-full flex flex-col justify-center items-center">
            {game?.players?.map((player:Player, index:number) => (
              <Player key={player.id} player={player} idx={index} totalPlayer={game.players.length} />
            ))}
            
            {game?.gameStatus === GameStatus.WAITING_FOR_PLAYERS && game?.ownerId===sessionStorage.getItem('sessionId') && (
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => StartGame(gameId, sessionStorage.getItem('sessionId') || '')}>
                Start Game
              </button>
            )}
          </div>
          {Cards( game?.players?.find((player: any) => player.sessionId === sessionStorage.getItem('sessionId')))}
        </div>
      );
}

export default GameTable;