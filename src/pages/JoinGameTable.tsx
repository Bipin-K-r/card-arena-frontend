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
    <div>
      <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center flex-col" style={{ position: 'relative' }}>
        <div style={{
            backgroundImage: "url(/wall.png)",
            opacity: 0.4,
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
      onJoinGame={onJoinGame}
    />
    </div>
  );
};

export default JoinGameTable;
