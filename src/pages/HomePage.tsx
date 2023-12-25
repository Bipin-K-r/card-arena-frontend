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

  const devlopers = [
    {
      name: "Bipin",
      role: "",
      imageUrl: "/bipin.png",
      linkedinUrl: "https://www.linkedin.com/in/bipin-k/",
    },
    {
      name: "Yogi",
      role: "",
      imageUrl: "/yogi.png",
      linkedinUrl: "https://www.linkedin.com/in/yogeshyadaviitg/",
    },
    {
      name: "Deva",
      role: "",
      imageUrl: "/deva.png",
      linkedinUrl: "https://www.linkedin.com/in/dtaneja123/",
    },
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

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Team</h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our clients.
            </p> */}
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {devlopers.map((person) => (
              <DeveloperCard key={person.name} {...person} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
