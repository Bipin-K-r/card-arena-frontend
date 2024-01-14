import Player from "./Player";
import Card from "./Card";

const Cards = (player:Player) => (
    <div className="mt-2">
      {player?.cards?.length > 0 && <div className=''>Your Cards : </div>}
      {player?.cards?.map((card: any, index: number) => (
        <Card key={index} card={card} index={index} />
      ))}
    </div>
  );

export default Cards;