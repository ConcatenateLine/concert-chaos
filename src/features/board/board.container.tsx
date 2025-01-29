import { useRef, useEffect, useState } from "react";
import BoxColors from "../box/utils/BoxColors.utils";
import BoxInterface from "../box/interfaces/Box.interface";
import TrasportationColors from "../Conveyor/utils/ConveyorColors.util";
import PackingStationInterface from "../packingStation/interfaces/PackingStation.interface";
import ConveyorInterface from "../Conveyor/interfaces/Conveyor.interface";
import RouteInterface from "../Conveyor/interfaces/Route.interface";
import ManhattanDistance from "../dashboard/utils/ManhattanDistance.util";
import DrawBox from "./utils/DrawBox.util";
import DrawBoard from "./utils/DrawBoard.util";
import DrawRoute from "./utils/DrawRoute.util";

interface BoadContainerProps {
  packingStations: PackingStationInterface[];
  conveyors: ConveyorInterface[];
  boxes: BoxInterface[];
  routes: RouteInterface[];
  updateDelivered: (newDelivered: number) => void;
  updateBlocked: (newBlocked: number) => void;
  updateLevel: (newLevel: number) => void;
  updateRoutes: (newRoutes: RouteInterface[]) => void;
}

interface Node {
  x: number;
  y: number;
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to goal
  f: number; // Total cost
  parent?: Node; // Parent node for path reconstruction
}

const BoardContainer = ({
  packingStations,
  conveyors,
  boxes,
  routes,
  updateDelivered,
  updateBlocked,
  updateLevel,
  updateRoutes,
}: BoadContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const localBoxes: BoxInterface[] = [...boxes];
  const localConveyors: ConveyorInterface[] = [...conveyors];
  const localPackingStations: PackingStationInterface[] = [...packingStations];
  const localRoutes: RouteInterface[] = [...routes];

  const [updateBoard, setUpdateBoard] = useState<boolean>(false);
  const gridSize = 10; // Define the grid size (the size of the square unit)
  const canvasWidth = 855;
  const canvasHeight = 600;

  // Updated findPathToPlatform function
  const findPathToPlatform = (
    item: { x: number; y: number; width: number; height: number },
    platform: { x: number; y: number; width: number; height: number },
    localConveyors: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>,
    grid: boolean[][],
    gridSize: number
  ): Array<{ x: number; y: number }> => {
    const goal = {
      ...platform,
    };

    const start = {
      ...item,
      x: item.x + item.width / 2,
      y: item.y + item.height / 2,
    };

    if (item.x < platform.x) {
      goal.x = platform.x + platform.width / 2;
    } else {
      goal.x = platform.x - platform.width / 2;
    }

    if (item.y < platform.y) {
      goal.y = platform.y + platform.height / 2;
    } else {
      goal.y = platform.y - platform.height / 2;
    }

    // Use A* to find the path
    const path = aStarPathfinding(start, goal, grid, gridSize);

    // console.log(path);

    return path;
  };

  // A* Pathfinding Algorithm
  const aStarPathfinding = (
    start: { x: number; y: number; width: number; height: number },
    goal: { x: number; y: number; width: number; height: number },
    grid: boolean[][],
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
        currentNode.x <= Math.floor((goal.x + goal.width) / gridSize) &&
        currentNode.y >= Math.floor(goal.y / gridSize) &&
        currentNode.y <= Math.floor((goal.y + goal.height) / gridSize)
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
          grid[neighbor.y][neighbor.x]
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

  // Function to create a grid representation of the road sections
  // Recive the road sections and the grid size (the size of the square unit)
  const createGridBoard = (
    localConveyors: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>,
    gridUnitSize: number
  ): boolean[][] => {
    const grid: boolean[][] = [];

    // Determine the size of the grid based on the road sections
    const maxWidth = Math.max(
      ...localConveyors.map((section) => section.x + section.width)
    );
    const maxHeight = Math.max(
      ...localConveyors.map((section) => section.y + section.height)
    );

    // Initialize the grid
    for (let y = 0; y < maxHeight; y += gridUnitSize) {
      const row: boolean[] = [];
      for (let x = 0; x < maxWidth; x += gridUnitSize) {
        // Check if the grid cell is within any road section
        const isRoad = localConveyors.some(
          (section) =>
            x >= section.x &&
            x < section.x + section.width &&
            y >= section.y &&
            y < section.y + section.height
        );
        row.push(isRoad);
      }
      grid.push(row);
    }
    return grid;
  };

  const initBoard = () => {
    const grid = createGridBoard(localConveyors, gridSize);

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
          localConveyors,
          grid,
          gridSize
        ),
      };
    });

    updateRoutes(newRoutes);
  };

  const updateScoreDelivered = (box: BoxInterface) => {
    updateDelivered(box.id);
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
      DrawBoard(context, localConveyors, localPackingStations);

      localRoutes.forEach((route) => {
        if (route.path.length > 0) {
          DrawRoute(context, route.path, route.color);
        }
      });

      localBoxes.forEach((box) => {
        DrawBox(context, box, localRoutes, updateScoreDelivered);
      });

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
