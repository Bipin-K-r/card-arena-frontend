import React from 'react';

const TileLayout: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-wrap gap-4 p-4">
            {['Judgement', 'Poker', 'Show', 'Bluff'].map((text) => (
                <div key={text} className="w-40 h-40 flex justify-center items-center bg-white text-black border border-gray-300 rounded shadow">
                    {text}
                </div>
            ))}
        </div>
    );
}

export default TileLayout;
