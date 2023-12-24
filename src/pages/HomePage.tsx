import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleTileClick = (game: string) => {
    if (game === "Poker") {
      window.location.href = "https://www.pokernow.club/start-game";
    } else {
      navigate(`/${game.toLowerCase()}`);
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 p-4">
      {["Judgement", "Poker", "Show", "Bluff"].map((game) => (
        <div
          key={game}
          className="w-40 h-40 flex justify-center items-center bg-white text-black border border-gray-300 rounded shadow cursor-pointer"
          onClick={() => handleTileClick(game)}
        >
          {game}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
