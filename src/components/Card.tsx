import React from 'react';

const Card: React.FC<{ index: number, card: any }> = ({ index, card }) => {
    return (
        <div key={index} className="text-gray-600">
            <img
                src={`/cards/${card.rank}_${card.suit}.png`}
                alt={`${card.rank} of ${card.suit}`}
                style={{ height: '100px', objectFit: 'contain' }}
            />
        </div>
    );
};

export default Card;
