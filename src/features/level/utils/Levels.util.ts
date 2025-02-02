import BoxColors from "../../box/utils/BoxColors.utils";
import ConveyorColors from "../../Conveyor/utils/ConveyorColors.util";
import LevelDataInterface from "../interfaces/Levels.interface";
import LevelData from "../interfaces/Levels.interface";

const levelsData: LevelData[] = [
  {
    packingStations: [
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
    ],
    conveyors: [
      { x: 350, y: 400, width: 100, height: 200, color: ConveyorColors[0] },
      { x: 650, y: 0, width: 100, height: 600, color: ConveyorColors[0] },
      { x: 50, y: 400, width: 760, height: 100, color: ConveyorColors[0] },
      { x: 350, y: 0, width: 400, height: 100, color: ConveyorColors[0] },
    ],
    routes: [
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
    ],
  },
  {
    packingStations: [],
    conveyors: [],
    routes: [
      {
        id: 2,
        start: 4,
        end: 3,
        color: BoxColors[2],
        path: [],
      },
    ],
  },
  {
    packingStations: [
      {
        x: 200,
        y: 0,
        width: 100,
        height: 60,
        color: BoxColors[4],
        speed: 1,
        status: "Stop",
        id: 5,
      },
    ],
    conveyors: [
      { x: 200, y: 0, width: 100, height: 500, color: ConveyorColors[0] },
    ],
    routes: [
      {
        id: 3,
        start: 5,
        end: 1,
        color: BoxColors[3],
        path: [],
      },
    ],
  },
  {
    packingStations: [],
    conveyors: [],
    routes: [
      {
        id: 4,
        start: 5,
        end: 2,
        color: BoxColors[4],
        path: [],
      },
      {
        id: 5,
        start: 4,
        end: 5,
        color: BoxColors[5],
        path: [],
      },
    ],
  },
  {
    packingStations: [
      {
        x: 0,
        y: 200,
        width: 60,
        height: 100,
        color: BoxColors[5],
        speed: 1,
        status: "Stop",
        id: 6,
      },
    ],
    conveyors: [
      {
        x: 0,
        y: 200,
        width: 450,
        height: 100,
        color: ConveyorColors[0],
      },
    ],
    routes: [
      {
        id: 6,
        start: 6,
        end: 5,
        color: BoxColors[6],
        path: [],
      },
    ],
  },
  {
    packingStations: [],
    conveyors: [
      { x: 350, y: 200, width: 100, height: 350, color: ConveyorColors[0] },
    ],
    routes: [
      {
        id: 7,
        start: 6,
        end: 3,
        color: BoxColors[7],
        path: [],
      },
    ],
  },
  {
    packingStations: [
      {
        x: 790,
        y: 200,
        width: 60,
        height: 100,
        color: BoxColors[6],
        speed: 1,
        status: "Stop",
        id: 7,
      },
    ],
    conveyors: [
      { x: 500, y: 200, width: 400, height: 100, color: ConveyorColors[0] },
    ],
    routes: [
      {
        id: 8,
        start: 7,
        end: 4,
        color: BoxColors[8],
        path: [],
      },
      {
        id: 9,
        start: 1,
        end: 7,
        color: BoxColors[9],
        path: [],
      },
    ],
  },
  {
    packingStations: [],
    conveyors: [
      { x: 500, y: 200, width: 100, height: 300, color: ConveyorColors[0] },
    ],
    routes: [],
  },
];

export const getLevelData = (
  levelIndex: number
): Promise<LevelDataInterface> => {
  if (levelIndex < 0 || levelIndex >= levelsData.length) {
    return new Promise((resolve) => {
      resolve({
        packingStations: [],
        conveyors: [],
        routes: [],
      });
    });
  }
  return new Promise((resolve) => {
    resolve(levelsData[levelIndex]);
  });
};

export default levelsData;
