import { ScoresType } from "../App";
type Props = {
  currentPlayer: string;
  scores: ScoresType; // Используем тип из App
  totalGamesCount: number;
};

const Scores = ({ currentPlayer, scores, totalGamesCount }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-3xl font-bold">
        Ходить: {currentPlayer === "X" ? "Гравець 1" : "Гравець 2"}
      </p>
      <div className="flex gap-10 mx-auto text-lg">
        <p>
          Гравець 1 (X): кількість виграшів <span>{scores.X}</span>
        </p>
        <p>
          Гравець 2 (O): кількість виграшів <span>{scores.O}</span>
        </p>
      </div>
      <p className="text-xl font-bold">Усього раз зіграно: {totalGamesCount}</p>
    </div>
  );
};

export default Scores;
