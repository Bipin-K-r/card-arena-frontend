import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';
import JoinGame from '../services/socket';

const Judgement: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(true); // Popup open by default
  const navigate = useNavigate();

  const onCreateGame = async (name?: string) => {
    try {
      const gameId = JoinGame(name); // Pass input value to JoinGame method
      if (gameId === undefined) {
        console.error('Error creating game: gameId is undefined');
        return;
      }
      navigate('/game/' + gameId); // Navigate to GameTable with token
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  useEffect(() => {
    if (!isPopupOpen) {
      navigate('/'); // Navigate back to homepage when popup is closed
    }
  }, [isPopupOpen, navigate]);

  return (
    <Popup
      isOpen={isPopupOpen}
      onClose={() => setPopupOpen(false)}
      onCreateGame={onCreateGame}
    />
  );
};

export default Judgement;
