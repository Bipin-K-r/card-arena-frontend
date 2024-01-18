import React from 'react';
import Card from './Card';

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

const TableCards: React.FC<{ card: Card, idx: number, totalPlayer: number }> = ({ card, idx, totalPlayer }) => {
	const calculatePosition = (index: number, totalPlayers: number) => {
		const radiusX = window.innerWidth * 0.2; // Adjust the X radius as needed (40% of the screen width)
		const radiusY = window.innerHeight * 0.2; // Adjust the Y radius as needed (30% of the screen height)
		const angle = (2 * Math.PI * index) / totalPlayers;
		const x = radiusX * Math.cos(angle);
		const y = radiusY * Math.sin(angle);
		return { x, y };
	};
	return (
		<div
			key={card.rank + card.suit}
			className="absolute flex justify-center items-center"
			style={{
				top: '50%',
				left: '50%',
				transform: `translate(${calculatePosition(idx, totalPlayer).x}px, ${calculatePosition(idx, totalPlayer).y}px)`,
			}}
		>
        <Card card={card} isRaised={false} index={0} handleOnClick={()=>{}}/>
		</div>
	);
};

export default TableCards;
