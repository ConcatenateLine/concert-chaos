import { createContext, useState } from "react";
import BoardContextInterface, {
  BoardStateInterface,
} from "../interfaces/BoardContext.interface";
import BoxColors from "../../box/utils/BoxColors.utils";
import BoxInterface from "../../box/interfaces/Box.interface";
import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import ConveyorColors from "../../Conveyor/utils/ConveyorColors.util";

export const BoardContext = createContext<BoardContextInterface | undefined>(
  undefined
);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardState, setBoardState] = useState<BoardStateInterface>({
    delivered: 0,
    blocked: 0,
    level: 1,
    lastTime: 0,
  });

  const [packingStations, setPackingStations] = useState<
    PackingStationInterface[]
  >([
    {
      x: 50,
      y: 200,
      width: 40,
      height: 100,
      color: BoxColors[0],
      speed: 1,
      status: "stop",
      id: 1,
    },
    {
      x: 750,
      y: 400,
      width: 40,
      height: 100,
      color: BoxColors[1],
      speed: 1,
      status: "stop",
      id: 2,
    },
    {
      x: 355,
      y: 0,
      width: 100,
      height: 40,
      color: BoxColors[2],
      speed: 1,
      status: "stop",
      id: 3,
    },
    {
      x: 355,
      y: 500,
      width: 100,
      height: 40,
      color: BoxColors[3],
      speed: 1,
      status: "stop",
      id: 4,
    },
  ]);
  const [conveyors, setConveyors] = useState<ConveyorInterface[]>([
    { x: 50, y: 40, width: 200, height: 100, color: ConveyorColors[0] }, // Bottom side (Top in screen)
    { x: 50, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    { x: 200, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    // { x: 355, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    { x: 650, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Right side
    { x: 50, y: 400, width: 425, height: 100, color: ConveyorColors[0] }, // Top side
    { x: 355, y: 0, width: 445, height: 100, color: ConveyorColors[0] }, // bottom side
    {
      x: 355,
      y: 400,
      width: 445,
      height: 450,
      color: ConveyorColors[0],
    }, // Top side
  ]);
  const [boxes, setBoxes] = useState<BoxInterface[]>([
    {
      x: -1,
      y: -1,
      step: 0,
      width: 20,
      height: 20,
      color: BoxColors[0],
      speed: 1,
      status: "stop",
      id: 0,
      platformOrigin: 1,
      platformDestination: 2,
      route: 0,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[0],
      speed: 1,
      status: "stop",
      id: 1,
      platformOrigin: 1,
      platformDestination: 3,
      route: 1,
    },
  ]);
  const [routes, setRoutes] = useState<RouteInterface[]>([
    {
      id: 0,
      start: 1,
      end: 3,
      color: "white",
      path: [],
    },
    {
      id: 1,
      start: 2,
      end: 4,
      color: "white",
      path: [],
    },
  ]);

  const updateDelivered = (newScore: number) => {
    setBoardState((prev) => ({ ...prev, delivered: boardState.delivered + 1 }));
  };
  const updateBlocked = (newScore: number) => {
    setBoardState((prev) => ({ ...prev, blocked: newScore }));
  };

  const updateLevel = (newLevel: number) => {
    setBoardState((prev) => ({ ...prev, level: newLevel }));
  };

  const updateRoutes = (newRoutes: RouteInterface[]) => {
    setRoutes(newRoutes);
  };

  return (
    <BoardContext.Provider
      value={{
        ...boardState,
        packingStations,
        conveyors,
        boxes,
        routes,
        updateDelivered,
        updateBlocked,
        updateLevel,
        updateRoutes,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
