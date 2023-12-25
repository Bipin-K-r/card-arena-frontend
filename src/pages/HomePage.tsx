import React from "react";
import { useNavigate } from "react-router-dom";
import DeveloperCard from "../components/DeveloperCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleTileClick = (game: string) => {
    if (game === "Poker") {
      window.location.href = "https://www.pokernow.club/start-game";
    } else {
      navigate(`/${game.toLowerCase()}`);
    }
  };

  const developers = [
    { name: "Bipin", img: "url_to_image_1", linkedIn: "https://www.linkedin.com/in/bipin-k/" },
    { name: "Yogi", img: "url_to_image_2", linkedIn: "https://www.linkedin.com/in/yogeshyadaviitg/" },
    { name: "Deva", img: "url_to_image_3", linkedIn: "https://www.linkedin.com/in/dtaneja123/" },
  ];

  return (
    <>
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
      
      <div className="developers-container flex justify-center items-center flex-wrap gap-4">
        {developers.map(dev => (
          <DeveloperCard key={dev.name} name={dev.name} img={dev.img} linkedIn={dev.linkedIn} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
