interface BoxInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number; // Speed of traslation
  lastMoveTime?: number; // Last move time
  platformOrigin: number; // Origin platform number
  platformDestination: number; // Destination platform number
  status: string; // Status of the box
  route: number; // Route number
  step: number; // Step of the route
  id: string;
}

export default BoxInterface;
