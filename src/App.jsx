import { useState } from "react";
import Die from "./Die"

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((d, i) => ({
        dieIndex: i,
        currentValue: getRandomDieValue(),
        onHold: false
      }))
  }

  function holdDie(dieIndex) {
    setDice(dice.toSpliced(dieIndex, 1, { ...dice[dieIndex], onHold: true }));
  }

  function rollDice() {
    setDice(prev => prev.map((die=> die.onHold ? die : {...die, currentValue: getRandomDieValue()})));
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map(die =>
          <Die
            key= {die.dieIndex}
            dieSetup= {die}
            handleClick={() => holdDie(die.dieIndex)}
          />
        )}
      </div>
      <button onClick={()=>rollDice()}>roll</button>
    </main>
  )
}

function getRandomDieValue() {
  return Math.ceil(Math.random() * 6);
}