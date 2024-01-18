import { useState } from "react";
import { PlayCardGame } from "../services/Socket";
import Card from "./Card";

const Cards = (game: any) => {
  const player = game?.players?.find((player: any) => player.sessionId === sessionStorage.getItem('sessionId'));
  const playerIndex = game?.players?.findIndex((player: any) => player.sessionId === sessionStorage.getItem('sessionId'));
  const suitCards = player?.cards?.filter((card: any) => card.suit === game?.table?.cardsOnDisplay[0]?.suit);
  const [selectedCard, setSelectedCard] = useState<number>(-1);

  const handleClick = (cardIndex:number) => {
    if(game?.gameStatus === 'PLAYING' && game?.chance===playerIndex){
      if(selectedCard != cardIndex){
        if(game?.table?.cardsOnDisplay?.length > 0 && suitCards?.length > 0){
          if(player?.cards[cardIndex].suit === game?.table?.cardsOnDisplay[0].suit){
            setSelectedCard(cardIndex);
          }
          else{
            alert('You have to play the same suit card');
          }
        }
        else{
          setSelectedCard(cardIndex);
        }
      }
      else{
        PlayCardGame(player?.cards[cardIndex]);
        setSelectedCard(-1);
        game.gameStatus = 'WAITING_FOR_PLAYERS';
      }
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