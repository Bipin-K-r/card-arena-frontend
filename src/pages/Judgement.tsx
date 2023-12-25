import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';


const Judgement: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(true); // Popup open by default
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    try {
      const token = 'token-from-backend'; // Replace with actual backend call
      navigate('/GameTable', { state: { token } }); // Navigate to GameTable with token
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
