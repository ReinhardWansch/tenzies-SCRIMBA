import { useState, useRef } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { getTimeString } from "./utils"

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [time, setTime] = useState(0);
  const timeInterval = useRef({});
  const [rollCount, setRollCount]= useState(0);


  function isGameWon() {
    let isWon= dice.every(die => die.isHeld) &&
      dice.every(die => die.value === dice[0].value);
    isWon && stopTime();
    return isWon;
  }

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    setRollCount(prev=>prev+1);
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ?
        die :
        { ...die, value: Math.ceil(Math.random() * 6) }
    ))
  }

  function hold(id) {
    dice.every((die) => !die.isHeld) && startTime();
    setDice(oldDice => oldDice.map(die =>
      die.id === id ?
      { ...die, isHeld: !die.isHeld } :
      die
    ))
  }

  function startTime() {
    timeInterval.current = setInterval(() => setTime(prev => prev + 1), 1000);
  }

  function stopTime() {
    clearInterval(timeInterval.current);
  }

  function resetTime() {
    setTime(0);
  }

  function resetGame() {
    resetTime();
    setRollCount(0);
    setDice(generateAllNewDice());
  }

  function cheat() {
    setDice(prev=>prev.map(die=>({
      ...die,
      value: 6,
      isHeld: true  
    })));
  }

  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      {isGameWon() && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="controls-container">
        <p>{getTimeString(time)}</p>
        <button
          className="roll-dice"
          onClick={isGameWon() ? resetGame : rollDice}
        >
          {isGameWon() ? "New Game" : "Roll"}
        </button>
        <p>Rolls: {rollCount}</p>
      </div>
      <button onClick={cheat}>cheat</button>
    </main>
  )
}