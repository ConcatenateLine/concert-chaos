import { useRef, useEffect } from "react";
import BoxInterface from "../box/interfaces/Box.interface";
import PackingStationInterface from "../packingStation/interfaces/PackingStation.interface";
import ConveyorInterface from "../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../Conveyor/interfaces/Route.interface";
import ManhattanDistance from "./utils/ManhattanDistance.util";
import DrawBox from "./utils/DrawBox.util";
import DrawConveyor from "./utils/DrawConveyor.util";
import DrawRoute from "./utils/DrawRoute.util";
import StatusAction from "./enums/StatusAction";
import DrawPackingStation from "./utils/DrawPackingStation.util";
import Node from "./interfaces/Node.interface";
import { createGridBoard } from "./utils/GridBoard.util";
import SquareInterface from "./interfaces/Square.interface";
import CheckBoxCollisions from "./utils/CheckBoxCollisions.util";
import DrawBarRemainingTime from "./utils/DrawBarRemainingTime.util";

interface BoadContainerProps {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  boxes: BoxInterface[];
  routes: RouteInterface[];
  lastTime: number;
  currentTime: number;
  addBox: (box: BoxInterface) => void;
  updateBoxesDelivered: (box: BoxInterface) => void;
  updateBoxesCollisions: (newBlocked: BoxInterface) => void;
  updateRoutes: (newRoutes: RouteInterface[]) => void;
  updateLastTime: (number: number) => void;
  updateBoard: boolean;
}

const BoardContainer = ({
  packingStations,
  conveyors,
  boxes,
  routes,
  lastTime,
  currentTime,
  addBox,
  updateBoxesDelivered,
  updateBoxesCollisions,
  updateRoutes,
  updateLastTime,
  updateBoard,
}: BoadContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const localBoxes: BoxInterface[] = [...boxes];
  const localConveyors: ConveyorInterface[] = [...conveyors];
  const localPackingStations: PackingStationInterface[] = [...packingStations];
  const localRoutes: RouteInterface[] = [...routes];

  const gridSize = 10; // Define the grid size (the size of the square unit)
  const canvasWidth = 855;
  const canvasHeight = 615;

  const grid = createGridBoard(localConveyors, gridSize);

  // Updated findPathToPlatform function
  const findPathToPlatform = (
    item: { x: number; y: number; width: number; height: number },
    platform: { x: number; y: number; width: number; height: number },
    grid: SquareInterface[][],
    gridSize: number
  ): Array<{ x: number; y: number }> => {
    const goal = {
      ...platform,
      x: platform.x + platform.width / 2,
      y: platform.y + platform.height / 2,
    };

    const start = {
      ...item,
      x: item.x + item.width / 2,
      y: item.y + item.height / 2,
    };

    // Use A* to find the path
    const path = aStarPathfinding(start, goal, grid, gridSize);

    // console.log(path);

    return path;
  };

  // A* Pathfinding Algorithm
  const aStarPathfinding = (
    start: { x: number; y: number; width: number; height: number },
    goal: { x: number; y: number; width: number; height: number },
    grid: SquareInterface[][],
    gridSize: number
  ): Array<{ x: number; y: number }> => {
    const openSet: Node[] = [];
    const closedSet: Set<string> = new Set();

    const startNode: Node = {
      x: Math.floor(start.x / gridSize),
      y: Math.floor(start.y / gridSize),
      g: 0,
      h: ManhattanDistance(start, goal),
      f: 0,
    };
    openSet.push(startNode);

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const currentNode = openSet.shift()!;

      // Check if we've reached the goal
      if (
        currentNode.x >= Math.floor(goal.x / gridSize) &&
        currentNode.x <= Math.floor(goal.x / gridSize) &&
        currentNode.y >= Math.floor(goal.y / gridSize) &&
        currentNode.y <= Math.floor(goal.y / gridSize)
      ) {
        const path: Array<{ x: number; y: number }> = [];
        let tempNode: Node | undefined = currentNode;
        while (tempNode) {
          path.push({ x: tempNode.x * gridSize, y: tempNode.y * gridSize });
          tempNode = tempNode.parent;
        }
        return path.reverse(); // Return the path in correct order
      }

      closedSet.add(`${currentNode.x},${currentNode.y}`);

      const neighbors = [
        { x: currentNode.x, y: currentNode.y - 1 }, // Up
        { x: currentNode.x, y: currentNode.y + 1 }, // Down
        { x: currentNode.x - 1, y: currentNode.y }, // Left
        { x: currentNode.x + 1, y: currentNode.y }, // Right
      ];

      for (const neighbor of neighbors) {
        // Ensure neighbor is within bounds
        if (
          neighbor.x >= 0 &&
          neighbor.x < grid[0].length &&
          neighbor.y >= 0 &&
          neighbor.y < grid.length &&
          grid[neighbor.y][neighbor.x].isRoad
        ) {
          if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;

          const gCost = currentNode.g + 1; // Assuming cost to move to neighbor is 1
          const hCost = ManhattanDistance(neighbor, goal);
          const fCost = gCost + hCost;

          const existingNodeIndex = openSet.findIndex(
            (node) => node.x === neighbor.x && node.y === neighbor.y
          );

          if (existingNodeIndex === -1) {
            openSet.push({
              x: neighbor.x,
              y: neighbor.y,
              g: gCost,
              h: hCost,
              f: fCost,
              parent: currentNode,
            });
          } else {
            const existingNode = openSet[existingNodeIndex];
            if (gCost < existingNode.g) {
              existingNode.g = gCost;
              existingNode.h = hCost;
              existingNode.f = fCost;
              existingNode.parent = currentNode;
            }
          }
        }
      }
    }

    return []; // No path found
  };

  const initBoard = () => {
    const newRoutes = localRoutes.map((route) => {
      const originPackingStation = localPackingStations.find(
        (packingStation) => packingStation.id === route.start
      );
      const destinationPackingStation = localPackingStations.find(
        (packingStation) => packingStation.id === route.end
      );

      if (!originPackingStation || !destinationPackingStation) {
        return route;
      }

      return {
        ...route,
        path: findPathToPlatform(
          originPackingStation,
          destinationPackingStation,
          grid,
          gridSize
        ),
      };
    });

    updateRoutes(newRoutes);
  };

  useEffect(() => {
    initBoard();
  }, [updateBoard, gridSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let animationFrameId: number;

    if (!canvas || !context) return;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      DrawConveyor(context, localConveyors);

      DrawPackingStation(context, localPackingStations, localRoutes, addBox);

      localRoutes.forEach((route) => {
        const station = localPackingStations.find(
          (station) => station.id === route.start
        );

        if (
          route.path.length === 0 ||
          !station ||
          station.status !== StatusAction.RUN
        )
          return;

        DrawRoute(context, route.path, route.color);
      });

      localBoxes.forEach((box) => {
        const route = localRoutes.find((route) => route.id === box.route);
        if (!route) return;

        const station = localPackingStations.find(
          (station) => station.id === route?.start
        );

        if (!station) return;

        if (station.status !== StatusAction.RUN) return;

        if (CheckBoxCollisions(box, grid, gridSize)) {
          updateBoxesCollisions(box);
        }

        DrawBox(
          context,
          box,
          route,
          grid,
          gridSize,
          updateBoxesDelivered,
          updateLastTime
        );
      });

      DrawBarRemainingTime(
        context,
        canvasWidth,
        canvasHeight,
        currentTime,
        lastTime
      );

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start the drawing loop

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [localBoxes]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default BoardContainer;
