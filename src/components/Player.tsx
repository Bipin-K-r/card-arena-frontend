import React from 'react';

interface Card {
	rank: string;
	suit: string;
}

interface Player {
	id: string;
	name: string;
	sessionId: string;
	cards: Card[];
}

const Player: React.FC<{ player: Player, idx: number, totalPlayer: number, scorecard:any, isChance:boolean, calledIndices:number[]}> = ({ player, idx, totalPlayer, scorecard,isChance,calledIndices}) => {
	const calculatePosition = (index: number, totalPlayers: number) => {
		const radiusX = window.innerWidth * 0.3; // Adjust the X radius as needed (40% of the screen width)
		const radiusY = window.innerHeight * 0.3; // Adjust the Y radius as needed (30% of the screen height)
		const angle = (2 * Math.PI * index) / totalPlayers;
		const x = radiusX * Math.cos(angle);
		const y = radiusY * Math.sin(angle);
		return { x, y };
	};
	const isOwner = sessionStorage.getItem('playerName') === player.name;
	const isCalled = calledIndices.includes(idx);
	const name = isOwner ? player.name + ' (You)' : player.name;
	const bgcolor = isChance ? 'bg-green-200' : isCalled ? 'bg-yellow-200' : 'bg-red-200';
	return (
		<div
			key={player.id}
			className="absolute flex justify-center items-center"
			style={{
				top: '50%',
				left: '50%',
				transform: `translate(${calculatePosition(idx, totalPlayer).x}px, ${calculatePosition(idx, totalPlayer).y}px)`,
			}}
		>
			<div className={bgcolor + " rounded-full p-2 shadow-md"}>
				<span className="text-gray-800">{name}</span>
				<br />
				{scorecard!==null && isCalled && <span className="text-gray-800">C: {scorecard?.handsCalled[idx]}, W: {scorecard?.handsWon[idx]}</span>}
			</div>
		</div>
	);
};

export default Player;
