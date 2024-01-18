const Card: React.FC<{handleOnClick: (index:number)=>void, index: number, card: any , isRaised:boolean}> = ({handleOnClick, index, card, isRaised}) => {

    return (
        <div key={index} className={`text-gray-600 ${isRaised ? 'raised' : ''}`} onClick={()=>handleOnClick(index)}>
            <img
                src={`/cards/${card.rank}_${card.suit}.png`}
                alt={`${card.rank} of ${card.suit}`}
                style={{ height: '100px', objectFit: 'contain', marginBottom: isRaised ? '20px' : '0' }}
            />
        </div>
    );
};

export default Card;
