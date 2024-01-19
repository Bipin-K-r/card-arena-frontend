import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket, StartGame, StartNextHand } from '../services/Socket';
import Cards from '../components/Cards';
import Button from '../components/Button';
import Table from '../components/Table';
import CallHands from '../components/CallHands';
import './GameTable.css';
import Scorecard from '../components/Scorcard';
import Popup from 'reactjs-popup';

enum GameStatus {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  STARTING_SET = 'STARTING_SET',
  CALLING_HANDS = 'CALLING_HANDS',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  DECLARE_WINNER = 'DECLARE_WINNER'
}

const GameTable: React.FC = () => {
  const [game,setGame] = useState<any>();
  const shouldRedirect = sessionStorage.getItem('gameId') === null;
  const navigate = useNavigate();
  const { gameId } = useParams();

  const getMessage = (game:any) => {
    if(game?.gameStatus === GameStatus.WAITING_FOR_PLAYERS){
      return game?.players[game?.players.length - 1]?.name + ' has joined the game. Waiting for other players to join!';
    }
    else if(game?.gameStatus === GameStatus.CALLING_HANDS){
      return game?.players[game?.chance]?.name + ' is calling hands';
    }
    else if(game?.gameStatus === GameStatus.PLAYING){
      return game?.players[game?.chance]?.name + ' is playing a card';
    }
    else if(game?.gameStatus === GameStatus.DECLARE_WINNER){
      return game?.players[game?.chance]?.name + ' won this hand';
    }
    else if(game?.gameStatus === GameStatus.FINISHED){
      return game?.players[game?.chance]?.name + ' has won the game';
    }
    return '';
  }

  useEffect(() => {
    socket.on('stateUpdate', (gameData:any) => {
      if (gameData) {
        console.log('Received stateUpdate:', JSON.parse(gameData),'state: ',JSON.parse(gameData).gameStatus);
        setGame(JSON.parse(gameData));
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
      console.log('Emiting join game:', gameId);
      socket.emit('joinGame', {
        playerName: sessionStorage.getItem('playerName'),
        gameId: gameId,
        playerSessionId: sessionStorage.getItem('sessionId')
      });
    }
  }, [shouldRedirect, navigate, gameId]);

  useEffect(() => {
    const handleResize = () => {
      setGame((prevGame:any) => {
        return { ...prevGame, windowWidth: window.innerWidth, windowHeight: window.innerHeight };
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center flex-col" style={{ position: 'relative' }}>
        <div style={{
            backgroundImage: "url(/wall.png)",
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1
        }}></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center flex-col">
        <div className="absolute top-0 right-0 m-4">{sessionStorage.getItem('playerName')}!</div>
        <div>{getMessage(game)}</div>
        {Table(game)}
        <div>
          {game?.gameStatus === GameStatus.WAITING_FOR_PLAYERS && game?.ownerId===sessionStorage.getItem('sessionId') && (
            Button({ onClick: () => StartGame(gameId, sessionStorage.getItem('sessionId') || ''), text: 'Start Game' })
          )}
          {game?.gameStatus === GameStatus.DECLARE_WINNER && game?.ownerId===sessionStorage.getItem('sessionId') && (
            Button({ onClick: () => StartNextHand(gameId, sessionStorage.getItem('sessionId') || ''), text: 'Start Next Round' })
          )}
        </div>
        <div className='mt-2'> 
          {Cards(game)}
          {game?.gameStatus === GameStatus.CALLING_HANDS && game?.players[game?.chance]?.sessionId === sessionStorage.getItem('sessionId') && <CallHands/>}
          {game?.gameStatus !== GameStatus.WAITING_FOR_PLAYERS && (
            <div>
              {
                <Popup trigger=
                  {<button> Scorecard </button>}
                    position="right center">
                        {Scorecard(game)}
                </Popup>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameTable;