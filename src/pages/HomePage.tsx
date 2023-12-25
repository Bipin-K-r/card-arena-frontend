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
    {
      name: "Bipin",
      role: "",
      imageUrl: "/bipin.png",
      linkedinUrl: "https://www.linkedin.com/in/bipin-k/",
      githubUrl: "https://github.com/Bipin-K-r",
    },
    {
      name: "Yogi",
      role: "",
      imageUrl: "/yogi.png",
      linkedinUrl: "https://www.linkedin.com/in/yogeshyadaviitg/",
      githubUrl: "https://github.com/yogeshknp",
    },
    {
      name: "Deva",
      role: "",
      imageUrl: "/deva.png",
      linkedinUrl: "https://www.linkedin.com/in/dtaneja123/",
      githubUrl: "https://github.com/devashishTaneja",
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {" "}
      {/* Ensure full height of the viewport */}
      {/* Game Tiles - Increased Size */}
      <div className="flex justify-center items-center flex-wrap gap-6 p-6">
        {["Judgement", "Poker", "Show", "Bluff"].map((game) => (
          <div
            key={game}
            className="w-48 h-48 flex justify-center items-center bg-white text-black border border-gray-300 rounded shadow cursor-pointer" // Increased size
            onClick={() => handleTileClick(game)}
          >
            {game}
          </div>
        ))}
      </div>
      {/* "Our Team" Section at Bottom */}
      <div className="bg-white bg-opacity-50 py-12 sm:py-16">
        <div className="mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl text-center shadow-lg">
            Our Team
          </h2>
          <ul
            role="list"
            className="mx-auto mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 max-w-4xl"
          >
            {developers.map((person) => (
              <li key={person.name} className="developer-card flex-1 min-w-0">
                <DeveloperCard {...person} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
