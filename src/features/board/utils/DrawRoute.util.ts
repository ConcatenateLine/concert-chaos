// Function to draw the route on the canvas
const DrawRoute = (
  ctx: CanvasRenderingContext2D,
  path: Array<{ x: number; y: number }>,
  color: string = "white"
) => {
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  path.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  // ctx.strokeStyle = "transparent"; // Set the color of the route
  ctx.strokeStyle = color;
  ctx.lineWidth = 5; // Set the width of the route
  ctx.setLineDash([20, 10]);
  ctx.stroke();
};

export default DrawRoute;
