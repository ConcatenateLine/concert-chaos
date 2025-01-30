import BoxInterface from "../../box/interfaces/Box.interface";
import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

export interface BoardStateInterface {
  delivered: number;
  blocked: number;
  level: number;
  lastTime: number;
  gameOver: boolean;
}

export interface ScoreInterface {
  score: number;
  user: string;
}

export default interface BoardContextInterface extends BoardStateInterface {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  boxes: BoxInterface[];
  routes: RouteInterface[];
  scores: ScoreInterface[];
  latestScore: ScoreInterface;
  updateDelivered: (newDelivered: BoxInterface) => void;
  updateBlocked: (newBlocked: number) => void;
  updateLevel: (newLevel: number) => void;
  updateRoutes: (newRoutes: RouteInterface[]) => void;
  updateBoxes: (newBoxes: BoxInterface[]) => void;
  addBox: (box: BoxInterface) => void;
  updateBox: (box: BoxInterface) => void;
  updatePackingStationSpeed?: (id: number, speedOption: string) => void;
  updatePackingStationStatus?: (id: number, statusOption: string) => void;
  resetBoard: () => void;
}
