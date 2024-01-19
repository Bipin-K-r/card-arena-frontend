import React, { useEffect, useState } from 'react';
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
	const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calculatePosition = (index: number, totalPlayers: number) => {
		const radiusX = windowSize.width * 0.15; // Adjust the X radius as needed (40% of the screen width)
		const radiusY = windowSize.height * 0.15; // Adjust the Y radius as needed (30% of the screen height)
		const angle = (2 * Math.PI * index) / totalPlayers;
		const x = radiusX * Math.cos(angle);
		const y = radiusY * Math.sin(angle);
		return { x, y };
	};

	return (
		<div
			key={card.rank + card.suit}
			className='absolute'
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(-50%, -50%) translate(${calculatePosition(idx, totalPlayer).x}px, ${calculatePosition(idx, totalPlayer).y}px)`,
			}}
		>
			<Card card={card} isRaised={false} index={0} handleOnClick={()=>{}}/>
		</div>
	);
};

export default TableCards;
