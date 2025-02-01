import { createContext, useState } from "react";
import BoardContextInterface, {
  BoardStateInterface,
  ScoreInterface,
} from "../interfaces/BoardContext.interface";
import BoxColors from "../../box/utils/BoxColors.utils";
import BoxInterface from "../../box/interfaces/Box.interface";
import ConveyorInterface from "../../Conveyor/interfaces/Conveyor.interface";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";
import ConveyorColors from "../../Conveyor/utils/ConveyorColors.util";
import SpeedAction from "../enums/SpeedOption";
import StatusAction from "../enums/StatusAction";
import { getLevelData } from "../../level/utils/Levels.util";

export const BoardContext = createContext<BoardContextInterface | undefined>(
  undefined
);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const maxBoxesCollisions = 50;
  const maxBoxesBlocked = 10;

  const [boardState, setBoardState] = useState<BoardStateInterface>({
    boxesDelivered: 0,
    boxesBlocked: 0,
    boxesCollisions: 0,
    level: 0,
    lastTime: 0,
    gameOver: false,
    currentTime: 60000, //1 minute max for level 1
    reasonForFire: "You have been fired for no reason",
    passedTime: 0,
  });

  const [boxes, setBoxes] = useState<BoxInterface[]>([]);
  const [boxIds, setBoxIds] = useState<Set<string>>(new Set());
  const [updateBoard, setUpdateBoard] = useState<boolean>(false);

  const [packingStations, setPackingStations] = useState<
    PackingStationInterface[]
  >([
    {
      x: 50,
      y: 400,
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
      x: 350,
      y: 0,
      width: 60,
      height: 100,
      color: BoxColors[2],
      speed: 1,
      status: "Stop",
      id: 3,
    },
    {
      x: 350,
      y: 540,
      width: 100,
      height: 60,
      color: BoxColors[3],
      speed: 1,
      status: "Stop",
      id: 4,
    },
  ]);
  const [conveyors, setConveyors] = useState<ConveyorInterface[]>([
    { x: 350, y: 400, width: 100, height: 200, color: ConveyorColors[0] },
    { x: 650, y: 0, width: 100, height: 600, color: ConveyorColors[0] },
    { x: 50, y: 400, width: 760, height: 100, color: ConveyorColors[0] },
    { x: 350, y: 0, width: 400, height: 100, color: ConveyorColors[0] },
  ]);
  const [routes, setRoutes] = useState<RouteInterface[]>([
    {
      id: 0,
      start: 1,
      end: 3,
      color: BoxColors[0],
      path: [],
    },
    {
      id: 1,
      start: 2,
      end: 4,
      color: BoxColors[1],
      path: [],
    },
  ]);

  const updateRoutes = (newRoutes: RouteInterface[]) => {
    setRoutes(newRoutes);
  };

  // Box state update
  const updateBoxes = (newBoxes: BoxInterface[]) => {
    setBoxes(newBoxes);
  };

  const addBox = (box: BoxInterface) => {
    if (boxIds.has(box.id)) {
      // Box have been blocked because it's already present in the board (Id box is already present)
      updateBoxesBlocked(box);
    } else {
      setBoxIds((prev) => new Set(prev).add(box.id));
      setBoxes((prev) => [...prev, box]);
    }

    isGameOver();
  };

  const updateBox = (box: BoxInterface) => {
    setBoxes((prev) => prev.map((b) => (b.id === box.id ? box : b)));
  };

  const updateBoxesDelivered = (box: BoxInterface) => {
    const prevBoxIds = boxIds;
    prevBoxIds.delete(box.id);

    setBoxes((prev) => prev.filter((b) => b.id !== box.id));

    setBoxIds(() => new Set(prevBoxIds));

    if (box.status !== StatusAction.RUN) return;

    setBoardState((prev) => ({
      ...prev,
      boxesDelivered: boardState.boxesDelivered + 1,
    }));

    if (boardState.boxesDelivered >= boardState.level * 100) {
      updateLevel();
    }
  };

  const updateBoxesBlocked = (box: BoxInterface) => {
    setBoardState((prev) => ({
      ...prev,
      boxesBlocked: prev.boxesBlocked + 1,
      reasonForFire:
        prev.boxesBlocked + 1 >= prev.level * maxBoxesBlocked
          ? "You have been fired for exceed the maximum number of blocked boxes"
          : "You have been fired for no reason",
    }));
  };

  const updateBoxesCollisions = (box: BoxInterface) => {
    updateBox({
      ...box,
      x: box.x + 20,
      y: box.y + 20,
      status: StatusAction.COLLISION,
    });
    setBoardState((prev) => ({
      ...prev,
      boxesCollisions: prev.boxesCollisions + 1,
      reasonForFire:
        prev.boxesCollisions + 1 >= prev.level * maxBoxesCollisions
          ? "You have been fired for exceed the maximum number of collisions"
          : "You have been fired for no reason",
    }));
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
    if (!packingStations || packingStations.length === 0) {
      return;
    }

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

  // Level management
  const updateLevel = () => {
    setBoardState((prev) => ({
      ...prev,
      level: prev.level + 1,
      boxesCollisions: prev.boxesCollisions - prev.level * 20,
      boxesBlocked: prev.boxesBlocked - prev.level * 5,
      lastTime: 0,
      currentTime: prev.currentTime - 3000,
    }));

    initializeLevel(boardState.level);
  };

  const updateLastTime = (number: number) => {
    if (boardState.lastTime === 0) {
      setBoardState((prev) => ({
        ...prev,
        lastTime: number,
      }));
    } else if (number - boardState.lastTime > boardState.currentTime) {
      setBoardState((prev) => ({
        ...prev,
        gameOver: true,
        lastTime: 0,
        reasonForFire:
          "You have been fired for exceed the maximum time for completing the level",
      }));
    }
  };

  const initializeLevel = async (levelIndex: number) => {
    const levelData = await getLevelData(levelIndex); // Await the promise
    setPackingStations((prev) => [...prev, ...levelData.packingStations]);
    setConveyors((prev) => [...prev, ...levelData.conveyors]);
    setRoutes((prev) => [...prev, ...levelData.routes]);

    setUpdateBoard((prev) => !prev);
  };

  // Game over
  const isGameOver = () => {
    if (
      boardState.gameOver ||
      boardState.boxesCollisions >= boardState.level + 1 * maxBoxesCollisions ||
      boardState.boxesBlocked >= boardState.level + 1 * maxBoxesBlocked
    ) {
      setBoardState((prev) => ({ ...prev, gameOver: true, lastTime: 0 }));

      setBoxes([]);
      setPackingStations((prev) =>
        prev.map((station) => ({
          ...station,
          status: StatusAction.STOP,
          level: 1,
          lastDeliveryTime: 0,
        }))
      );
      setBoxIds(new Set());
      // TODO: reset routes
      // setConveyors([]);
      // setRoutes([]);

      setLocalStorage();
    }
  };

  const resetBoard = (user: string = "Guest" + new Date().toUTCString()) => {
    setBoardState((prev) => ({
      ...prev,
      boxesDelivered: 0,
      boxesBlocked: 0,
      boxesCollisions: 0,
      level: 1,
      lastTime: 0,
      currentTime: 60000,
      gameOver: false,
      reasonForFire: "You have been fired for no reason",
    }));
    setLocalStorage(user, true);
  };

  const setLocalStorage = (
    user: string = "Guest" + new Date().toUTCString(),
    changeName: boolean = false
  ) => {
    if (changeName || scores.length >= 9) scores.pop();

    scores.push({
      score: boardState.boxesDelivered,
      user: user,
      reasonForFire: boardState.reasonForFire,
    });

    localStorage.setItem(
      "ConcertChaos",
      JSON.stringify({
        scores: changeName
          ? scores.sort(
              (a: ScoreInterface, b: ScoreInterface) => b.score - a.score
            )
          : scores,
        latestScore: {
          score: boardState.boxesDelivered,
          user: user,
          reasonForFire: boardState.reasonForFire,
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
    reasonForFire: "You have been fired for no reason",
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
        updateBoxesDelivered,
        updateBoxesBlocked,
        updateBoxesCollisions,
        updateLevel,
        updateRoutes,
        updateBoxes,
        addBox,
        updateBox,
        updatePackingStationSpeed,
        updatePackingStationStatus,
        resetBoard,
        updateLastTime,
        updateBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
