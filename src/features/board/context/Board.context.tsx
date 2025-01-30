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
import SpeedAction from "../enums/SpeedOption";
import StatusAction from "../enums/StatusAction";

export const BoardContext = createContext<BoardContextInterface | undefined>(
  undefined
);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardState, setBoardState] = useState<BoardStateInterface>({
    delivered: 0,
    blocked: 0,
    level: 1,
    lastTime: 0,
    gameOver: false,
  });

  const [packingStations, setPackingStations] = useState<
    PackingStationInterface[]
  >([
    {
      x: 50,
      y: 200,
      width: 60,
      height: 100,
      color: BoxColors[0],
      speed: 1,
      status: "Stop",
      id: 1,
    },
    {
      x: 750,
      y: 400,
      width: 60,
      height: 100,
      color: BoxColors[1],
      speed: 1,
      status: "Stop",
      id: 2,
    },
    {
      x: 355,
      y: 0,
      width: 100,
      height: 60,
      color: BoxColors[2],
      speed: 1,
      status: "Stop",
      id: 3,
    },
    {
      x: 355,
      y: 500,
      width: 100,
      height: 60,
      color: BoxColors[3],
      speed: 1,
      status: "Stop",
      id: 4,
    },
  ]);
  const [conveyors, setConveyors] = useState<ConveyorInterface[]>([
    { x: 50, y: 40, width: 200, height: 100, color: ConveyorColors[0] }, // Bottom side (Top in screen)
    { x: 50, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    { x: 200, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    { x: 355, y: 130, width: 100, height: 450, color: ConveyorColors[0] }, // Left side
    { x: 650, y: 40, width: 100, height: 450, color: ConveyorColors[0] }, // Right side
    { x: 50, y: 400, width: 450, height: 100, color: ConveyorColors[0] }, // Top side
    { x: 355, y: 0, width: 450, height: 100, color: ConveyorColors[0] }, // bottom side
    {
      x: 355,
      y: 400,
      width: 450,
      height: 100,
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
      status: "Stop",
      id: 0,
      platformOrigin: 1,
      platformDestination: 3,
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
      status: "Stop",
      id: 1,
      platformOrigin: 2,
      platformDestination: 4,
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

  const [boxIds, setBoxIds] = useState<Set<number>>(new Set());

  const updateDelivered = (box: BoxInterface) => {
    const prevBoxIds = boxIds;
    boxIds.delete(box.id);

    setBoxes((prev) => prev.filter((b) => b.id !== box.id));
    setBoardState((prev) => ({ ...prev, delivered: boardState.delivered + 1 }));
    setBoxIds((prev) => new Set(prevBoxIds));
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

  // Box state update
  const updateBoxes = (newBoxes: BoxInterface[]) => {
    setBoxes(newBoxes);
  };

  const addBox = (box: BoxInterface) => {
    if (boxIds.has(box.id)) {
      gameover();
    } else {
      setBoxIds((prev) => new Set(prev).add(box.id));
      setBoxes((prev) => [...prev, box]);
    }
  };

  const updateBox = (box: BoxInterface) => {
    setBoxes((prev) => prev.map((b) => (b.id === box.id ? box : b)));
  };

  // Packing Station state update

  const updatePackingStationSpeed = (id: number, speedOption: string) => {
    setPackingStations((prev) =>
      prev.map((station) => {
        let newSpeed = station.speed;

        switch (speedOption) {
          case SpeedAction.increase:
            if (newSpeed >= 60) return station;

            newSpeed = newSpeed + 1;
            break;
          case SpeedAction.decrease:
            if (newSpeed <= 1) return station;

            newSpeed = newSpeed - 1;
            break;
          default:
            break;
        }

        return station.id === id ? { ...station, speed: newSpeed } : station;
      })
    );
  };

  const updatePackingStationStatus = (id: number, statusOption: string) => {
    setPackingStations((prev) =>
      prev.map((station) => {
        let newStatus = station.status;

        switch (statusOption) {
          case StatusAction.RUN:
            newStatus = StatusAction.RUN;
            break;
          case StatusAction.PAUSE:
            newStatus = StatusAction.PAUSE;
            break;
          case StatusAction.STOP:
            newStatus = StatusAction.STOP;
            break;
          case StatusAction.REMOVE:
            newStatus = StatusAction.REMOVE;
            break;
          default:
            break;
        }
        return station.id === id ? { ...station, status: newStatus } : station;
      })
    );
  };

  // Game over
  const gameover = () => {
    setBoardState((prev) => ({ ...prev, gameOver: true }));

    setBoxes([]);
    setPackingStations((prev) =>
      prev.map((station) => ({ ...station, status: StatusAction.STOP }))
    );
    // TODO: reset routes
    // setConveyors([]);
    // setRoutes([]);

    setLocalStorage();
  };

  const resetBoard = () => {
    setBoardState((prev) => ({ ...prev, delivered: 0, gameOver: false }));
  };

  const setLocalStorage = () => {
    const user = "Guest" + new Date().toUTCString();

    if (scores.length > 9) {
      scores.shift();
    }

    scores.push({
      score: boardState.delivered,
      user: user,
    });

    localStorage.setItem(
      "ConcertChaos",
      JSON.stringify({
        scores: scores,
        latestScore: {
          score: boardState.delivered,
          user: user,
        },
      })
    );
  };

  const getLocalStorage = () => {
    const data = localStorage.getItem("ConcertChaos");
    if (!data) return;
    return JSON.parse(data);
  };

  const { scores, latestScore } = getLocalStorage() || {
    scores: [],
    latestScore: 0,
  };

  return (
    <BoardContext.Provider
      value={{
        ...boardState,
        packingStations,
        conveyors,
        boxes,
        routes,
        scores,
        latestScore,
        updateDelivered,
        updateBlocked,
        updateLevel,
        updateRoutes,
        updateBoxes,
        addBox,
        updateBox,
        updatePackingStationSpeed,
        updatePackingStationStatus,
        resetBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
