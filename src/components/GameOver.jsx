export default function GameOver({restart, winner, hasDraw}){
    return <div id="game-over">
        <h2>Game Over!!</h2>
        {!winner && hasDraw && <p>Draw!!</p>}
        {winner && <p>{winner} won!</p>}
        <button onClick={restart}> Rematch</button>
    </div>
}