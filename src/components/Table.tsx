import Player from "./Player";
import './Table.css'; 
import TableCards from "./TableCards";

const Table = (game : any) => {
    const totalPlayers = game?.players?.length;
    return (
        <div className="table w-1/2 h-96 ">
            {game?.players?.map((player:Player, index:number) => (
              <Player key={player.id} player={player} idx={index} totalPlayer={totalPlayers} />
            ))}
            {game?.table?.cardsOnDisplay?.map((card:any, index:number) => (
                <TableCards key={index} card={card} idx={(index + game?.lastRoundWinner)%totalPlayers} totalPlayer={totalPlayers} />
            ))}
          </div>
    );
};

export default Table;
