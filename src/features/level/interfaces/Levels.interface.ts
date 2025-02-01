import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

interface LevelDataInterface {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  routes: RouteInterface[];
}

export default LevelDataInterface;
