type Props = {
  player: string;
  index: number;
  onClick(e: any): void;
};

const Square = ({ player, index, onClick }: Props) => {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-yellow-200" : "text-fuchsia-300";
  return (
    <div
      data-cell-index={index}
      className={`h-20 w-16 max-w-80 border-solid border-4 border-slate-200 font-display text-7xl text-center 
        flex justify-center items-center cursor-pointer transition duration-500 hover:scale-105`}
      {...{ onClick }}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
      >
        {player}
      </span>
    </div>
  );
};

export default Square;
