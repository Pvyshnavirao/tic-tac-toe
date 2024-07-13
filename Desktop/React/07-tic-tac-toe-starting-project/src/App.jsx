import react, { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './components/winning-combinations';

const PLAYERS ={
  X:'Player 1' ,
  O:'Player 2 '
};

const initialgameboard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


function deriveActiveplayer(gameTurns){
  let currentPlayer = 'X';

    if(gameTurns.length>0 && gameTurns[0].player === 'X'){
      currentPlayer='O';
    }
return currentPlayer;
}

function deriveGameboard(gameTurns){

  let prevGameBoard = [...initialgameboard.map(array=>[...array])];
  for(const turn of gameTurns){
      const{square , player} = turn;
      const{ row, col }= square;
      prevGameBoard[row][col] = player;
  }
return prevGameBoard;
}

function deriveWinner(prevGameBoard,players){

  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = 
    prevGameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=
    prevGameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=
    prevGameBoard[combination[2].row][combination[2].column];
  
  if(firstSquareSymbol &&
     firstSquareSymbol===secondSquareSymbol &&
      firstSquareSymbol===thirdSquareSymbol)
  {
      winner = players[firstSquareSymbol];
      }
  
  }
return winner;
}

function App() {
  const [players , setPlayers ]=useState(PLAYERS);
const[gameTurns,setgameTurns]=useState([]);



const activeplayer = deriveActiveplayer(gameTurns);
const prevGameBoard =deriveGameboard(gameTurns);
const winner = deriveWinner(prevGameBoard , players);
const hasDraw = gameTurns.length === 9 && !winner;

function handleselectsquare(rowIndex, colIndex){
  
  setgameTurns((prevTurns)=>{
   const currentPlayer =deriveActiveplayer(prevTurns);
    const updatedTurns =[
      {square: {row: rowIndex , col: colIndex }, player:currentPlayer } , ...prevTurns,
    ];
return updatedTurns;
  });
}

function handleRestart(){
  setgameTurns([]);
}

function handlePlayerNameChange(symbol , newName){
setPlayers(prevPlayers => {
  return {
    ...prevPlayers ,
  [symbol]: newName
  };
});
}
  return (
<menu>
  <div id='game-container'>
    <ol id='players' className='highlight-player'>
    
    <Player initialName={PLAYERS.X} 
    symbol='X' 
    isActive={activeplayer==='X'} 
    onChangeName={handlePlayerNameChange}
    />
    <Player
    initialName={PLAYERS.O} 
    symbol='O' 
    isActive={activeplayer==='O'}
    onChangeName={handlePlayerNameChange}/>
    
    </ol>

    {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart}/>}
    <GameBoard onSelectSquare={handleselectsquare} 
    board={prevGameBoard} />
  </div>
  <Log turns={gameTurns}/>
</menu>
  )
}

export default App
