import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleClick() {
        // setIsEditing(!isEditing);  --> this schedules a state update
        // correct way:
        setIsEditing((editing)=>!editing);
        
    }

    function handleInput(e) {
        setPlayerName(e.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {!isEditing ? 
                (<span className="player-name">{playerName}</span>) : 
                (<input type="text" value={playerName} required onChange={handleInput}></input>)}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
          </li>
    )
}