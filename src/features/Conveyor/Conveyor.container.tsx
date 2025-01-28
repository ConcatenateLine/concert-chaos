import React, { useRef, useEffect } from "react";
import BoxColors from "../box/utils/BoxColors.utils";
import TrasportationColors from "./utils/ConveyorColors.util";
import BoxInterface from "../box/interfaces/Box.interface";

interface Node {
  x: number;
  y: number;
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to goal
  f: number; // Total cost
  parent?: Node; // Parent node for path reconstruction
}

const ConveyorContainer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const items: BoxInterface[] = [
    // from platform 1
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
      id: 2,
      platformOrigin: 1,
      platformDestination: 4,
    },
    // from platform 2
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[1],
      speed: 1,
      status: "stop",
      id: 3,
      platformOrigin: 2,
      platformDestination: 1,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[1],
      speed: 1,
      status: "stop",
      id: 4,
      platformOrigin: 2,
      platformDestination: 3,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[1],
      speed: 1,
      status: "stop",
      id: 5,
      platformOrigin: 2,
      platformDestination: 4,
    },
    // from platform 3
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[2],
      speed: 1,
      status: "stop",
      id: 6,
      platformOrigin: 3,
      platformDestination: 1,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[2],
      speed: 1,
      status: "stop",
      id: 7,
      platformOrigin: 3,
      platformDestination: 2,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[2],
      speed: 1,
      status: "stop",
      id: 8,
      platformOrigin: 3,
      platformDestination: 4,
    },
    // from platform 4
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[3],
      speed: 1,
      status: "stop",
      id: 9,
      platformOrigin: 4,
      platformDestination: 1,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[3],
      speed: 1,
      status: "stop",
      id: 10,
      platformOrigin: 4,
      platformDestination: 2,
    },
    {
      step: 0,
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: BoxColors[3],
      speed: 2,
      status: "stop",
      id: 11,
      platformOrigin: 4,
      platformDestination: 3,
    },
    // Add more items as needed
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let animationFrameId: number;
    const roadSections = [
      { x: 50, y: 40, width: 200, height: 100, color: TrasportationColors[0] }, // Bottom side (Top in screen)
      { x: 50, y: 40, width: 100, height: 450, color: TrasportationColors[0] }, // Left side
      { x: 200, y: 40, width: 100, height: 450, color: TrasportationColors[0] }, // Left side
      // { x: 355, y: 40, width: 100, height: 450, color: TrasportationColors[0] }, // Left side
      { x: 650, y: 40, width: 100, height: 450, color: TrasportationColors[0] }, // Right side
      { x: 50, y: 400, width: 425, height: 100, color: TrasportationColors[0] }, // Top side
      { x: 355, y: 0, width: 445, height: 100, color: TrasportationColors[0] }, // bottom side
      {
        x: 355,
        y: 400,
        width: 445,
        height: 450,
        color: TrasportationColors[0],
      }, // Top side
      //add additional road sections
    ];

    const platforms = [
      {
        x: 50,
        y: 200,
        width: 40,
        height: 100,
        color: BoxColors[0],
        platform: 1,
      }, // Origin platform
      {
        x: 750,
        y: 400,
        width: 40,
        height: 100,
        color: BoxColors[1],
        platform: 2,
      }, // Destination platform
      {
        x: 355,
        y: 0,
        width: 100,
        height: 40,
        color: BoxColors[2],
        platform: 3,
      }, // Additional platform
      {
        x: 355,
        y: 500,
        width: 100,
        height: 40,
        color: BoxColors[3],
        platform: 4,
      }, // Additional platform
      // Add more platforms as needed
    ];

    if (!canvas || !context) return;

    const drawCircuit = () => {
      // Draw each section of the square circuit
      roadSections.forEach((section) => {
        context.fillStyle = section.color; // Set the section color
        context.fillRect(section.x, section.y, section.width, section.height);
      });

      // Draw each platform
      platforms.forEach((platform) => {
        context.fillStyle = platform.color; // Set the platform color
        context.fillRect(
          platform.x,
          platform.y,
          platform.width,
          platform.height
        ); // Draw the platform
      });
    };

    const validBoxInterfaceOnOriginPlatform = (item: BoxInterface): boolean => {
      const originPlatform = platforms.find(
        (p) => p.platform === item.platformOrigin
      );
      if (!originPlatform) return true;
      return (
        item.x + item.width <= originPlatform.x + originPlatform.width &&
        item.x >= originPlatform.x &&
        item.y + item.height <= originPlatform.y + originPlatform.height &&
        item.y >= originPlatform.y
      );
    };

    const colitionPointToPlatform = (
      platform: any,
      item: BoxInterface,
      direction: string
    ): boolean => {
      if (direction === "right") {
        return (
          item.x + item.width + item.speed >= platform.x &&
          item.x + item.width + item.width + item.speed <=
            platform.x + platform.width &&
          item.y >= platform.y &&
          item.y + item.height <= platform.y + platform.height
        );
      } else if (direction === "left") {
        return (
          item.x - item.width - item.speed >= platform.x &&
          item.x - item.speed <= platform.x + platform.width &&
          item.y >= platform.y &&
          item.y + item.height <= platform.y + platform.height
        );
      } else if (direction === "bottom") {
        return (
          item.y + item.height + item.speed >= platform.y &&
          item.y + item.height + item.height + item.speed <=
            platform.y + platform.height &&
          item.x >= platform.x &&
          item.x + item.width <= platform.x + platform.width
        );
      } else if (direction === "top") {
        return (
          item.y - item.height - item.speed >= platform.y &&
          item.y - item.speed <= platform.y + platform.height &&
          item.x >= platform.x &&
          item.x + item.width <= platform.x + platform.width
        );
      }

      return false;
    };

    const validBoxInterfaceOnDestinationPlatform = (
      item: BoxInterface
    ): boolean => {
      const destinationPlatform = platforms.find(
        (p) => p.platform === item.platformDestination
      );
      if (!destinationPlatform) return true;
      return (
        colitionPointToPlatform(destinationPlatform, item, "right") ||
        colitionPointToPlatform(destinationPlatform, item, "left") ||
        colitionPointToPlatform(destinationPlatform, item, "bottom") ||
        colitionPointToPlatform(destinationPlatform, item, "top")
      );
    };

    const distanceToNearestSection = (item: BoxInterface, platform: any) => {
      // Determine the nearest section to the item in base axe X or Y
      if (
        item.x >= platform.x &&
        item.x + item.width <= platform.x + platform.width &&
        (platform.y >= item.y + item.height ||
          platform.y + platform.height <= item.y)
      ) {
        return Math.abs(platform.y - item.y);
      } else if (
        item.y >= platform.y &&
        item.y + item.height <= platform.y + platform.height &&
        (platform.x >= item.x + item.width ||
          platform.x + platform.width <= item.x)
      ) {
        return Math.abs(platform.x - item.x);
      }

      return 800;
    };

    const movedToNearestRoadSection = (item: BoxInterface) => {
      const nearestSection = roadSections.reduce((a, b) => {
        return distanceToNearestSection(item, b) <
          distanceToNearestSection(item, a)
          ? b
          : a;
      }, roadSections[0]);

      // Update the item position
      if (
        item.x >= nearestSection.x &&
        item.x + item.width <= nearestSection.x + nearestSection.width &&
        (nearestSection.y >= item.y + item.height ||
          nearestSection.y + nearestSection.height <= item.y)
      ) {
        if (nearestSection.y > item.y) {
          item.y = nearestSection.y;
        } else {
          item.y = nearestSection.y + nearestSection.height - item.height;
        }
      } else if (
        item.y >= nearestSection.y &&
        item.y + item.height <= nearestSection.y + nearestSection.height &&
        (nearestSection.x >= item.x + item.width ||
          nearestSection.x + nearestSection.width <= item.x)
      ) {
        if (item.x >= nearestSection.x + nearestSection.width) {
          item.x = nearestSection.x + nearestSection.width - item.width;
        } else {
          item.x = nearestSection.x;
        }
      }
    };

    // Updated findPathToPlatform function
    const findPathToPlatform = (
      item: { x: number; y: number; width: number; height: number },
      platform: { x: number; y: number; width: number; height: number },
      roadSections: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
      }>
    ): Array<{ x: number; y: number }> => {
      const gridSize = 10; // Define the grid size
      const grid = createGrid(roadSections, gridSize);

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
    // Function to draw the route on the canvas
    const drawRoute = (
      ctx: CanvasRenderingContext2D,
      path: Array<{ x: number; y: number }>
    ) => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = "white"; // Set the color of the route
      ctx.lineWidth = 5; // Set the width of the route
      ctx.setLineDash([20, 10]);
      ctx.stroke();
    };

    // Function to create a grid representation of the road sections
    // Recive the road sections and the grid size (the size of the square unit)
    const createGrid = (
      roadSections: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
      }>,
      gridSize: number
    ): boolean[][] => {
      const grid: boolean[][] = [];

      // Determine the size of the grid based on the road sections
      const maxWidth = Math.max(
        ...roadSections.map((section) => section.x + section.width)
      );
      const maxHeight = Math.max(
        ...roadSections.map((section) => section.y + section.height)
      );

      // Initialize the grid
      for (let y = 0; y < maxHeight; y += gridSize) {
        const row: boolean[] = [];
        for (let x = 0; x < maxWidth; x += gridSize) {
          // Check if the grid cell is within any road section
          const isRoad = roadSections.some(
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

    // Heuristic function (Manhattan distance)
    const heuristic = (
      a: Partial<Node> & { x: number; y: number },
      b: Partial<Node> & { x: number; y: number }
    ): number => {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
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
        h: heuristic(start, goal),
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
            const hCost = heuristic(neighbor, goal);
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

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCircuit(); // Draw the circuit

      // Find the path to the platform
      const path = findPathToPlatform(platforms[1], platforms[0], roadSections);
      const path2 = findPathToPlatform(
        platforms[1],
        platforms[2],
        roadSections
      );
      const path3 = findPathToPlatform(
        platforms[0],
        platforms[3],
        roadSections
      );

      // console.log(path3);

      // Draw the route
      if (path.length > 0) drawRoute(context, path);
      if (path2.length > 0) drawRoute(context, path2);
      if (path3.length > 0) drawRoute(context, path3);

      const currentTime = performance.now(); // Get current time for timing control

      items.forEach((item) => {
        // Set the item color
        context.fillStyle = item.color;

        // Draw the item when start in the origin platform
        // if (item.x === -1 && item.y === -1) {
        //   const platform = platforms.find(
        //     (p) => p.platform === item.platformOrigin
        //   );
        //   if (!platform) return;

        //   item.x = platform.x + platform.width / 2;
        //   item.y = platform.y + platform.height / 2;
        // } else if (validBoxInterfaceOnDestinationPlatform(item)) {
        //   item.x = -1;
        //   item.y = -1;
        // } else if (validBoxInterfaceOnOriginPlatform(item)) {
        //   movedToNearestRoadSection(item);
        // } else {
        // Move the Box to platform destination with timing control
        if (item.step + 1 < path2.length) {
          if (!item.lastMoveTime) {
            item.lastMoveTime = currentTime; // Initialize last move time
          }

          // Check if 2 seconds have passed
          if (currentTime - item.lastMoveTime >= item.speed * 50) {
            // if (currentTime - item.lastMoveTime >= 2000) {
            item.step++;
            item.x = path2[item.step].x;
            item.y = path2[item.step].y;
            item.lastMoveTime = currentTime; // Update last move time

            // console.log(item);
            
          }
        } else {
          item.step = 0; // Reset step if at the end of the path
        }
        // }

        if (item.status === "block") {
          context.fillStyle = "black";
        }

        // Draw the item
        context.fillRect(item.x, item.y, item.width, item.height);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start the drawing loop

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [items]);

  return <canvas ref={canvasRef} width={800} height={535} />;
};

export default ConveyorContainer;
