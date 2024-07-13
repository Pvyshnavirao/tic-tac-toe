
export default function GameBoard( {onSelectSquare , board }){

    // const[prevGameBoard , setGameBoard ]=useState(initialgameboard);

// function handleselectsquare(rowIndex , colIndex , ){
//     setGameBoard((prevGameBoard)=>{
//         const updatedgameBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
//         updatedgameBoard[rowIndex][colIndex]= activeplayersymbol;
//         return updatedgameBoard;
//     });

//     onSelectSquare();
// } 
    return(
        <ol id="game-board">
    {board.map((row , rowIndex)=>(
        <li key={(rowIndex)}>
            <ol>
                {row.map((playerSymbol , colIndex)=>(
                    <li key={colIndex}>
                        <button onClick={()=>onSelectSquare(rowIndex,colIndex)}
                              disabled={playerSymbol !== null } >{playerSymbol}
                          
                        </button>
                    </li>
                ))}</ol> </li>
    )
    )}
        </ol>
    );
}