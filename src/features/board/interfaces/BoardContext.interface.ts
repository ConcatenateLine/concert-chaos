import BoxInterface from "../../box/interfaces/Box.interface";
import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

export interface BoardStateInterface {
  boxesDelivered: number;
  boxesBlocked: number;
  boxesCollisions: number;
  level: number;
  lastTime: number;
  gameOver: boolean;
  currentTime: number;
  reasonForFire: string;
  passedTime: number;
}

export interface ScoreInterface {
  score: number;
  user: string;
  reasonForFire?: string;
}

export default interface BoardContextInterface extends BoardStateInterface {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  boxes: BoxInterface[];
  routes: RouteInterface[];
  scores: ScoreInterface[];
  latestScore: ScoreInterface;
  updateBoxesDelivered: (newDelivered: BoxInterface) => void;
  updateBoxesBlocked: (newBlocked: BoxInterface) => void;
  updateBoxesCollisions: (newBlocked: BoxInterface) => void;
  updateLevel: () => void;
  updateRoutes: (newRoutes: RouteInterface[]) => void;
  updateBoxes: (newBoxes: BoxInterface[]) => void;
  addBox: (box: BoxInterface) => void;
  updateBox: (box: BoxInterface) => void;
  updatePackingStationSpeed?: (id: number, speedOption: string) => void;
  updatePackingStationStatus?: (id: number, statusOption: string) => void;
  resetBoard: () => void;
  updateLastTime: (number: number) => void;
  updateBoard: boolean;
}
