const DrawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Move to the top-left corner
  ctx.lineTo(x + width - radius, y); // Top edge
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // Top-right corner
  ctx.lineTo(x + width, y + height - radius); // Right edge
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Bottom-right corner
  ctx.lineTo(x + radius, y + height); // Bottom edge
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // Bottom-left corner
  ctx.lineTo(x, y + radius); // Left edge
  ctx.quadraticCurveTo(x, y, x + radius, y); // Top-left corner
  ctx.closePath();
  ctx.fill(); // Fill the shape
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2; // Set the width of the route
  ctx.setLineDash([]);
  ctx.stroke();
};

export default DrawRoundedRect;
