class Box {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  lastMoveTime?: number;
  platformOrigin: number;
  platformDestination: number;
  status: string;
  route: number;
  step: number;
  id: number;

  constructor(
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: string,
    speed?: number,
    platformOrigin?: number,
    platformDestination?: number,
    status?: string,
    route?: number,
    step?: number,
    id?: number
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 10;
    this.height = height || 10;
    this.color = color || "white";
    this.speed = speed || 0;
    this.platformOrigin = platformOrigin || 0;
    this.platformDestination = platformDestination || 0;
    this.status = status || "idle";
    this.route = route || 0;
    this.step = step || 0;
    this.id = id || -1;
  }
}

export default Box;
