import React from 'react';
import { useLocation } from 'react-router-dom';

const GameTable: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;

  return (
    <div>
      <div className="text-center">Game Room: {token}</div>
      {/* Rest of the game table layout */}
    </div>
  );
};

export default GameTable;
