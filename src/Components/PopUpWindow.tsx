import ReactModal from "react-modal";

type Props = {
  winner: string | null;
  setWinner: any;
};

const PopUpWindow = ({ winner, setWinner }: Props) => {
  return (
    <>
      <ReactModal
        isOpen={winner !== null}
        onRequestClose={() => setWinner(null)}
        className="bg-white text-black p-16 rounded-lg shadow-lg max-w-md mx-auto text-center flex flex-col gap-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        shouldCloseOnOverlayClick={true}
      >
        <div className="text-center">
          {winner === "Draw" ? (
            <h2 className="text-lg font-bold">Нічия! Спробуйте ще раз :)</h2>
          ) : (
            <h2 className="text-lg font-bold">
              {winner === "X" ? "Гравець 1" : "Гравець 2"} переміг. Вітаємо!
            </h2>
          )}
        </div>
        <button
          onClick={() => setWinner(null)}
          className="text-black hover:text-gray-500 transition text-2xl font-bold border-solid border-2 "
        >
          Ок
        </button>
      </ReactModal>
    </>
  );
};

export default PopUpWindow;
