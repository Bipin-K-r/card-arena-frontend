import React from 'react';

interface GameTablePageProps {
  gameToken: string;
}

const GameTablePage: React.FC<GameTablePageProps> = ({ gameToken }) => {
  return (
    <div className="game-table-page">
      <div className="game-room-header">Game Room: {gameToken}</div>
      <div className="poker-table">
        {/* Chairs and table layout */}
      </div>
      {/* Other game page content */}
    </div>
  );
};

export default GameTablePage;
