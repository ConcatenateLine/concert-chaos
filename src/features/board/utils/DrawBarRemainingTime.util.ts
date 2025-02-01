import DrawRoundedRect from "./DrawRoundedRect.util";

const DrawBarRemainingTime = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentTime: number,
  lastTime: number
) => {
  const currentTimePerformance = performance.now(); // Get current time for timing control
  const widthPercentage = Math.floor(
    ((currentTime - (currentTimePerformance - lastTime)) * 100) / currentTime
  );

  const widthPercentage2 = Math.floor((widthPercentage * width) / 100);

  // Draw each Conveyor of the circuit
  ctx.fillStyle = "#e3e724c2";
  DrawRoundedRect(ctx, 0, height - 10, widthPercentage2, 10, 0);
};

export default DrawBarRemainingTime;
