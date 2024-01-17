import Player from "./Player";
import './Table.css'; 

const Table = (game : any) => {
    return (
        <div className="table w-1/2 h-96 ">
            {game?.players?.map((player:Player, index:number) => (
              <Player key={player.id} player={player} idx={index} totalPlayer={game.players.length} />
            ))} 
          </div>
    );
};

export default Table;
