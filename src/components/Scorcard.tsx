const Scorecard = (game:any) => {
    return (
        <table className="scorecard">
            <thead>
                <tr>
                {game?.players?.map((player:any, index:number) => (
                    <th key={index}>{player.name}</th>))}
                </tr>
            </thead>
            <tbody>
                {game?.scorecard?.map((scorecard:any, roundNo:number) => (
                    <tr key={roundNo}>
                        {game?.players?.map((_:any, index:number) => (
                            <td key={index}>
                                {'C: ' + scorecard.handsCalled[index] + ', W: ' + scorecard.handsWon[index] + ', S: ' + scorecard.scores[index]}
                            </td>
                        ))}
                    </tr>
                ))}
                {game?.totalScores!==null && <tr key={14}>
                    {game?.players?.map((_:any, index:number) => (
                        <td key={index}>
                             {game?.totalScores[index]}
                        </td>
                    ))}
                
                </tr>}
            </tbody>
        </table>
    );
};

export default Scorecard;
