import BoxInterface from "../../box/interfaces/Box.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import DrawRoundedRect from "./DrawRoundedRect.util";

const DrawBox = (
  ctx: CanvasRenderingContext2D,
  box: BoxInterface,
  route: RouteInterface | undefined,
  updateDelivered?: (box: BoxInterface) => void
) => {
  const currentTime = performance.now(); // Get current time for timing control

  // Set the Box color
  ctx.fillStyle = box.color;

  if (!route) return;

  // Move the Box to platform destination with timing control
  if (box.step + 1 < route.path.length) {
    if (!box.lastMoveTime) {
      box.lastMoveTime = currentTime; // Initialize last move time
    }

    // Check if speed time of the Box have passed
    if (currentTime - box.lastMoveTime >= box.speed * 50) {
      box.step++;
      box.x = route.path[box.step].x;
      box.y = route.path[box.step].y;
      box.lastMoveTime = currentTime; // Update last move time
    }
  } else {
    box.step = 0; // Reset step if at the end of the path
    if (updateDelivered) {
      updateDelivered(box);
    }
  }

  if (box.status === "block") {
    ctx.fillStyle = "black";
  }

  // Draw the box
  // TODO: Validate this function
  // ctx.fillRect(box.x, box.y, box.width, box.height);
  DrawRoundedRect(ctx, box.x, box.y, box.width, box.height, 5);
};

export default DrawBox;
