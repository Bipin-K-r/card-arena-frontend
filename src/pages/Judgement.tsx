import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';
import { JoinGame } from '../services/Socket';

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
    <div>
      <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center flex-col" style={{ position: 'relative' }}>
        <div style={{
            backgroundImage: "url(/wall.png)",
            opacity: 0.7,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1
        }}></div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onCreateGame={onCreateGame}
      />
    </div>
  );
};

export default Judgement;
