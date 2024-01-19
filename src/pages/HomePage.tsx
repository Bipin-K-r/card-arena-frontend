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
      <div className="absolute top-0 left-0 w-screen h-screen justify-between min-h-screen">
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
        <div className="bg-gray bg-opacity-50 py-12 sm:py-16">
          <div className="mx-auto px-4 lg:px-6">
            <div className="flex justify-center items-center">
              <div className="inline-block bg-gray-200 shadow-lg px-4 py-2 rounded">
                <h2 className="text-3xl font-bold text-black sm:text-5xl md:text-6xl text-center">Our Team</h2>
              </div>
            </div>

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
      </div>
  );
};

export default HomePage;
