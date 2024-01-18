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

const Player: React.FC<{ player: Player, idx: number, totalPlayer: number }> = ({ player, idx, totalPlayer }) => {
	const calculatePosition = (index: number, totalPlayers: number) => {
		const radiusX = window.innerWidth * 0.3; // Adjust the X radius as needed (40% of the screen width)
		const radiusY = window.innerHeight * 0.3; // Adjust the Y radius as needed (30% of the screen height)
		const angle = (2 * Math.PI * index) / totalPlayers;
		const x = radiusX * Math.cos(angle);
		const y = radiusY * Math.sin(angle);
		return { x, y };
	};

	const name = sessionStorage.getItem('playerName') === player.name ? player.name + ' (You)' : player.name;
	const bgcolor = sessionStorage.getItem('playerName') === player.name ? 'bg-gray-200' : 'bg-white';
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
			</div>
		</div>
	);
};

export default Player;
