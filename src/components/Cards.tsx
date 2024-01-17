import Card from "./Card";

const Cards = (game: any) => {
  const player = game?.players?.find((player: any) => player.sessionId === sessionStorage.getItem('sessionId'));
  return (
    <div className="cards">
      {player?.cards?.length > 0 && <div className=''>Your Cards : </div>}
      {player?.cards?.map((card: any, index: number) => (
        <Card key={index} card={card} index={index} />
      ))}
    </div>
  );
};

export default Cards;