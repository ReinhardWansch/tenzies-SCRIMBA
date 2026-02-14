import { useState } from "react";
import Die from "./Die"

export default function App() {
  const [dice, setDice]= useState(generateAllNewDice()); 

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((d, i) => ({
        dieId: i,
        currentValue: Math.ceil(Math.random() * 6),
        onHold: false
      }))
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map(dice => 
          <Die key={dice.dieId} value={dice.currentValue} />
        )}
      </div>
    </main>
  )
}