import { useState } from "react";

export default function Player({ name, symbol, isActive,onChangeName }) {
  const [isEditing, setEditing] = useState(false);
  const [playerNameEditable, setPlayerName] = useState(name);

  function handleEdit() {
    setEditing((isEditing) => !isEditing);
    if(isEditing){
      onChangeName(symbol,playerNameEditable);
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerName = <span className="player-name"> {playerNameEditable}</span>;
  let buttonName = "Edit";

  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        value={playerNameEditable}
        onChange={handleNameChange}
      />
    );
    buttonName = "Save";
  }

  return (
    <li className={isActive?"active":undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol"> {symbol}</span>
      </span>
      <button onClick={handleEdit}>{buttonName}</button>
    </li>
  );
}
