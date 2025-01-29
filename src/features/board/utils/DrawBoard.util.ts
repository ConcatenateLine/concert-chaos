import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

const DrawBoard = (
  ctx: CanvasRenderingContext2D,
  localConveyors: ConveyorInterface[],
  localPackingStations: PackingStationInterface[]
) => {
  // Draw each Conveyor of the circuit
  localConveyors.forEach((section) => {
    ctx.fillStyle = section.color;
    ctx.fillRect(section.x, section.y, section.width, section.height);
  });

  // Draw each Pacman Station
  localPackingStations.forEach((platform) => {
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
};

export default DrawBoard;
