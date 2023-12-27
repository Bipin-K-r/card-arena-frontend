import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';
import JoinGame from '../services/socket';


const Judgement: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(true); // Popup open by default
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    try {
      const gameId = JoinGame();
      if (gameId === undefined) {
        // Show error message popup on screen
        console.error('Error creating game: gameId is undefined');
        return;
      }
      navigate('/GameTable/' + gameId); // Navigate to GameTable with token
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
      onCreateGame={handleCreateGame}
    />
  );
};



export default Judgement;
