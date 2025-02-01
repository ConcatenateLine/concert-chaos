import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import DrawRoundedRect from "./DrawRoundedRect.util";

const DrawConveyor = (
  ctx: CanvasRenderingContext2D,
  localConveyors: ConveyorInterface[]
) => {
  // Draw each Conveyor of the circuit
  localConveyors.forEach((section) => {
    ctx.fillStyle = section.color;

    DrawRoundedRect(
      ctx,
      section.x,
      section.y,
      section.width,
      section.height,
      10
    );
  });
};

export default DrawConveyor;
