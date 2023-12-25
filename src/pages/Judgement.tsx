import React, { useState } from 'react';
import Popup from '../components/Popup';


const Judgement: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [gameToken, setGameToken] = useState<string>('');

  const handleCreateGame = async () => {
    // Call the backend to create a game and retrieve a token
    // For demonstration, we're using a static string as the token
    const token = 'token-from-backend'; // Replace with actual token from backend
    setGameToken(token);
    setPopupOpen(false);
  };

  return (
    <div className="judgement-page">
      {!gameToken && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => setPopupOpen(true)}
        >
          Create Game
        </button>
      )}

      {gameToken && <div className="game-room mt-4">Game Room: {gameToken}</div>}

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onCreateGame={handleCreateGame}
      />
      {/* Rest of your Judgement game page content */}
    </div>
  );
};

export default Judgement;
