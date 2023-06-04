import { useEffect, useState } from "react";
import Dice from "./Components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = diceArray.every((die) => die.isHeld);
    const firstVal = diceArray[0].value;
    const allSameVal = diceArray.every((die) => die.value === firstVal);
    if (allHeld && allSameVal) {
      setTenzies(true);
    }
  }, [diceArray]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDiceArray((prevState) =>
      prevState.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function newGame() {
    setDiceArray(allNewDice());
    setTenzies(false);
  }

  function holdDice(id) {
    setDiceArray((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {diceArray.map((die) => (
          <Dice
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button className="roll-dice-btn" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
