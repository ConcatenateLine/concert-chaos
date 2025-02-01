import BoxInterface from "../../box/interfaces/Box.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import StatusAction from "../enums/StatusAction";
import SquareInterface from "../interfaces/Square.interface";
import DrawRoundedRect from "./DrawRoundedRect.util";

const DrawBox = (
  ctx: CanvasRenderingContext2D,
  box: BoxInterface,
  route: RouteInterface | undefined,
  grid: SquareInterface[][],
  gridSize: number,
  updateDelivered: (box: BoxInterface) => void,
  updateLastTime: (number: number) => void
) => {
  const currentTime = performance.now(); // Get current time for timing control

  // Set the Box color
  ctx.fillStyle = box.color;

  if (!route) return;

  // Move the Box to platform destination with timing control
  if (box.step + 1 < route.path.length && box.status === StatusAction.RUN) {
    if (!box.lastMoveTime) {
      box.lastMoveTime = currentTime; // Initialize last move time
    }

    // Remove 1 from the onRoad value of the current square location
    if (grid && grid.length && grid[0].length) {
      if (
        grid[Math.floor(box.y / gridSize)][Math.floor(box.x / gridSize)]
          .onRoad > 0
      )
        grid[Math.floor(box.y / gridSize)][Math.floor(box.x / gridSize)]
          .onRoad--;
    }

    // Check if speed time of the Box have passed
    if (currentTime - box.lastMoveTime >= box.speed * 50) {
      box.step++;
      box.x = route.path[box.step].x;
      box.y = route.path[box.step].y;
      box.lastMoveTime = currentTime; // Update last move time

      if (grid && grid.length && grid[0].length) {
        // Add 1 to the onRoad value of the new current square location
        grid[Math.floor(route.path[box.step].y / gridSize)][
          Math.floor(route.path[box.step].x / gridSize)
        ].onRoad++;
      }
    }
  } else if (box.status === StatusAction.COLLISION) {
    // Remove 1 from the onRoad value of the current square location if the Box is in a collision
    if (grid && grid.length && grid[0].length) {
      if (
        grid[Math.floor(box.y / gridSize)][Math.floor(box.x / gridSize)]
          .onRoad > 0
      )
        grid[Math.floor(box.y / gridSize)][Math.floor(box.x / gridSize)]
          .onRoad--;
    }

    if (
      box.lastMoveTime &&
      currentTime - box.lastMoveTime >= box.speed * 2000
    ) {
      box.status = StatusAction.REMOVE;
    }
  } else {
    updateDelivered(box);
  }
  updateLastTime(currentTime);

  // Draw the box
  DrawRoundedRect(ctx, box.x, box.y, box.width, box.height, 5);
};

export default DrawBox;
