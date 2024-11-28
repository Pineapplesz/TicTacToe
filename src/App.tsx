import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import PopUpWindow from "./Components/PopUpWindow";
import Scores from "./Components/Scores";
import Square from "./Components/Square";
import generateWinningCombos from "./Components/GenerateWinningCombos";

ReactModal.setAppElement("#root");

export type ScoresType = {
  [key: string]: number;
};
const InitialScores: ScoresType = { X: 0, O: 0, D: 0 };

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [gameState, setGameState] = useState(
    Array(gridSize * gridSize).fill("")
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState<ScoresType>(InitialScores);
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameBlocked, setIsGameBlocked] = useState(false);
  const [winningCombos, setWinningCombos] = useState(
    generateWinningCombos(gridSize)
  );
  useEffect(() => {
    setGameState(Array(gridSize * gridSize).fill(""));
    setWinningCombos(generateWinningCombos(gridSize));
    setWinner(null);
    setIsGameBlocked(false);
  }, [gridSize]);
  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState.every((cell) => cell === "")) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  useEffect(() => {
    setGameState(Array(gridSize * gridSize).fill(""));
    setWinningCombos(generateWinningCombos(gridSize));
  }, [gridSize]);

  const resetBoard = () => {
    setGameState(Array(gridSize * gridSize).fill(""));
    setWinner(null);
    setIsGameBlocked(false);
    setCurrentPlayer("X");
  };

  const totalGamesCount = scores.X + scores.O + scores.D;

  const handleWin = () => {
    setWinner(currentPlayer);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);

    localStorage.setItem("scores", JSON.stringify(newScores));
  };

  const handleDraw = () => {
    setWinner("Draw");

    const newScores = { ...scores };
    newScores.D += 1;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningCombos.length; i++) {
      const winCombo = winningCombos[i];
      const values = winCombo.map((index) => gameState[index]);

      if (values.includes("")) {
        continue;
      }
      if (values.every((val) => val === values[0])) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      setIsGameBlocked(true);
      setTimeout(() => handleWin(), 2000);
      return;
    }
    if (!gameState.includes("")) {
      setIsGameBlocked(true);
      setTimeout(() => handleDraw(), 2000);
    }
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (e: any) => {
    if (isGameBlocked) return;

    const cellIndex = Number(e.target.getAttribute("data-cell-index"));
    const currentValue = gameState[cellIndex];

    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <main className="h-full p-8 flex flex-col gap-6">
      <Scores
        currentPlayer={currentPlayer}
        scores={scores}
        totalGamesCount={totalGamesCount}
      />
      <div className="flex justify-center gap-5 items-center">
        <label htmlFor="gridSize" className="text-lg font-bold">
          Розмір сітки:
        </label>
        <select
          id="gridSize"
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {Array.from({ length: 7 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>{`${size}×${size}`}</option>
          ))}
        </select>
      </div>
      <div
        className="grid gap-3 mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          maxWidth: `${gridSize * 150}px`,
        }}
      >
        {gameState.map((player, index) => (
          <Square
            key={index}
            onClick={handleCellClick}
            {...{ index, player }}
          />
        ))}
      </div>
      <div
        onClick={resetBoard}
        className="border-solid border-2 w-40 px-4 py-2 cursor-pointer hover:bg-white hover:text-black 
        transition-all mx-auto"
      >
        Нова гра
      </div>
      <PopUpWindow winner={winner} setWinner={setWinner} />
    </main>
  );
}

export default App;
