import BoxInterface from "../../box/interfaces/Box.interface";
import SquareInterface from "../interfaces/Square.interface";

const CheckBoxCollisions = (
  box: BoxInterface,
  grid: SquareInterface[][],
  gridSize: number
) => {
  if (!grid || !grid.length || !grid[0].length) return false;

  const boxX = Math.floor(box.x / gridSize);
  const boxY = Math.floor(box.y / gridSize);

  return grid[boxY][boxX].onRoad > 1;
};

export default CheckBoxCollisions;
