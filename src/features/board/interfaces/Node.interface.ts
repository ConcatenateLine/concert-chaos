interface Node {
  x: number;
  y: number;
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to goal
  f: number; // Total cost
  parent?: Node; // Parent node for path reconstruction
}

export default Node;
