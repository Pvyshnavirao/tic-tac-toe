import { useState } from "react";

export default function Player({initialName , symbol , isActive , onChangeName }){
    const [playerName , setplayerName] = useState(initialName);
    const [setstate , isediting ]= useState(false);

function handleisediting(){
    isediting((editing)=>!editing);
    
    if (setstate)
        { 
        onChangeName(symbol, playerName);
    }
   
}

function handlenewname(event){
setplayerName(event.target.value);
}

let editableplayerName =  <span className='player-name'>{playerName} </span>;

if (setstate){
    editableplayerName = (<input type="text" required  value={playerName} onChange={handlenewname}/>);
}
    return(
        <li className={isActive?'active':undefined}>
       {editableplayerName}
        <span className='player-symbol'>{symbol}</span>
        <button onClick={handleisediting}>{setstate ? 'Save' :'Edit'}</button>
        </li>
    );
}
