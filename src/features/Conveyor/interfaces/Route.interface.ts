interface RouteInterface {
  id: number;
  start: number;
  end: number;
  color: string;
  path: Array<{ x: number; y: number }>;
}

export default RouteInterface;
