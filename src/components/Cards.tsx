import { useState } from "react";
import { PlayCardGame } from "../services/Socket";
import Card from "./Card";

const Cards = (game: any) => {
  const player = game?.players?.find((player: any) => player.sessionId === sessionStorage.getItem('sessionId'));
  const [selectedCard, setSelectedCard] = useState<number>(-1);

  const handleClick = (cardIndex:number) => {
    if(selectedCard != cardIndex){
    setSelectedCard(cardIndex);
    }
    else if (game?.gameStatus === 'PLAYING') {
      PlayCardGame(player?.cards[cardIndex]);
    }
  }
  return (
    <div className="cards">
      {player?.cards?.length > 0 && <div className=''>Your Cards : </div>}
      {player?.cards?.map((card: any, index: number) => (
        <Card handleOnClick={handleClick} key={index} card={card} index={index} isRaised={selectedCard === index} />
      ))}
    </div>
  );
};

export default Cards;