import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../components/JoinGamePopup';
import { JoinGame } from '../services/Socket';

const JoinGameTable: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(true); // Popup open by default
  const navigate = useNavigate();
  const { gameId } = useParams(); // Extract gameId from URL path parameter

  const onJoinGame = async (name?: string) => {
    try {
      JoinGame(name, gameId);
      navigate('/game/' + gameId);
    } catch (error) {
      console.error('Error joining game:', error);
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
      onJoinGame={onJoinGame}
    />
  );
};

export default JoinGameTable;
