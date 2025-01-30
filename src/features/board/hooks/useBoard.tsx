import { useContext } from "react";
import { BoardContext } from "../context/Board.context";

const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export default useBoard;
