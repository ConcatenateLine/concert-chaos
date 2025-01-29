import BoxInterface from "../../box/interfaces/Box.interface";
import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

export interface BoardStateInterface {
  delivered: number;
  blocked: number;
  level: number;
  lastTime: number;

  // Add other game-related state variables
}

export default interface BoardContextInterface extends BoardStateInterface {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  boxes: BoxInterface[];
  routes: RouteInterface[];
  updateDelivered: (newDelivered: number) => void;
  updateBlocked: (newBlocked: number) => void;
  updateLevel: (newLevel: number) => void;
  updateRoutes: (newRoutes: RouteInterface[]) => void;
}
