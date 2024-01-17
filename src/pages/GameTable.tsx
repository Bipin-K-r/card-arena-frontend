import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket, StartGame } from '../services/Socket';
import Cards from '../components/Cards';
import Button from '../components/Button';
import Table from '../components/Table';
import CallHands from '../components/CallHands';
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
  const shouldRedirect = sessionStorage.getItem('gameId') === null;
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
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      {Table(game)}
      <div>
        {game?.gameStatus === GameStatus.WAITING_FOR_PLAYERS && game?.ownerId===sessionStorage.getItem('sessionId') && (
          Button({ onClick: () => StartGame(gameId, sessionStorage.getItem('sessionId') || ''), text: 'Start Game' })
        )}
      </div>
      <div className='mt-2'> 
      {Cards(game)}
      {game?.gameStatus === GameStatus.CALLING_HANDS && <CallHands/>}
      </div>
    </div>
  );
}

export default GameTable;