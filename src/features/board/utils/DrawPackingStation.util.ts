import Box from "../../box/models/Box";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";
import StatusAction from "../enums/StatusAction";
import DrawRoundedRect from "./DrawRoundedRect.util";

const DrawPackingStation = (
  ctx: CanvasRenderingContext2D,
  localPackingStations: PackingStationInterface[],
  localRoutes: RouteInterface[],
  addBox: (box: any) => void
) => {
  // Draw each packing Station
  localPackingStations.forEach((packingStation) => {
    const currentTime = performance.now(); // Get current time for timing control

    if (!packingStation.lastDeliveryTime) {
      packingStation.lastDeliveryTime = currentTime; // Initialize last delivery time
    }

    ctx.fillStyle = packingStation.color;

    DrawRoundedRect(
      ctx,
      packingStation.x,
      packingStation.y,
      packingStation.width,
      packingStation.height,
      10
    );

    if (packingStation.status !== StatusAction.RUN) return;

    // Check if speed time of the delivery have passed
    if (
      currentTime - packingStation.lastDeliveryTime <=
      packingStation.speed * 1000 // 1000 milliseconds = 1 second
    )
      return;

    const routes = localRoutes.filter(
      (route) => route.start === packingStation.id
    );

    if (routes.length === 0) return;

    routes.forEach((route) => {
      const station = localPackingStations.find(
        (station) => station.id === route.end
      );

      if (!station || station.status !== StatusAction.RUN) return;

      const box = new Box(
        station.x,
        station.y,
        20,
        20,
        packingStation.color,
        1,
        packingStation.id,
        station.id,
        StatusAction.RUN
      );

      box.route = route.id;
      box.id = `${route.id}-${Math.floor(Math.random() * 6000)}`;

      addBox(box);
    });

    packingStation.lastDeliveryTime = currentTime; // Update last delivery time
  });
};

export default DrawPackingStation;
