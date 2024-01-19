import Player from "./Player";
import TableCards from "./TableCards";
import './Table.css'; 

const Table = (game : any) => {
  const totalPlayers = game?.players?.length;
  const scorecard = game?.scorecard?.length? game?.scorecard[game?.scorecard?.length-1]:null;
  const calledIndices = game?.scorecard?.length? game?.scorecard[game?.scorecard?.length-1].handsCalled.map((val:number, index:number) => val!==null?index:-1).filter((val:number) => val!==-1):[]; 
  return (
    <div className="table relative w-2/5 h-2/5 flex justify-center items-center flex-col">
          {game?.players?.map((player:Player, index:number) => (
            <Player key={player.id} player={player} idx={index} totalPlayer={totalPlayers} scorecard={scorecard} isChance={game?.chance===index} calledIndices={calledIndices}/>
          ))}
          {game?.table?.cardsOnDisplay?.map((card:any, index:number) => (
              <TableCards key={index} card={card} idx={(index + game?.lastRoundWinner)%totalPlayers} totalPlayer={totalPlayers} />
          ))}
        </div>
  );
};

export default Table;
