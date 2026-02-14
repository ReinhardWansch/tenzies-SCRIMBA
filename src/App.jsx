import { useState } from "react";
import Die from "./Die"

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((d, i) => ({
        dieIndex: i,
        currentValue: Math.ceil(Math.random() * 6),
        onHold: false
      }))
  }

  function holdDie(dieIndex) {
    setDice(dice.toSpliced(dieIndex, 1, { ...dice[dieIndex], onHold: true }));
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
    </main>
  )
}