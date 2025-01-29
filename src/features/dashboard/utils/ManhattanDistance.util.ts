// Heuristic function (Manhattan distance)
const ManhattanDistance = (
  a: { x: number; y: number },
  b: { x: number; y: number }
): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export default ManhattanDistance;
