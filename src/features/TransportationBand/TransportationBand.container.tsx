import React, { useRef, useEffect } from "react";

interface Item {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number; // Speed of the item
  platformOrigin: number; // Origin platform number
  platformDestination: number; // Destination platform number
  orientation: string; // Direction of movement
  status: string; // Status of the item
}

const TransportBand: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const items: Item[] = [
    // from platform 1
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "blue",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 1,
      platformDestination: 2,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "blue",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 1,
      platformDestination: 3,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "blue",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 1,
      platformDestination: 4,
    },
    // from platform 2
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "green",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 2,
      platformDestination: 1,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "green",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 2,
      platformDestination: 3,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "green",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 2,
      platformDestination: 4,
    },
    // from platform 3
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "orange",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 3,
      platformDestination: 1,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "orange",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 3,
      platformDestination: 2,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "orange",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 3,
      platformDestination: 4,
    },
    // from platform 4
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "red",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 4,
      platformDestination: 1,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "red",
      speed: 1,
      status: "stop",
      orientation: "stop",
      platformOrigin: 4,
      platformDestination: 2,
    },
    {
      x: -1,
      y: -1,
      width: 20,
      height: 20,
      color: "red",
      speed: 1,
      status: "stop",
      orientation: "stop",
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
      { x: 50, y: 40, width: 700, height: 100 }, // Bottom side
      { x: 50, y: 40, width: 100, height: 450 }, // Left side
      { x: 650, y: 40, width: 100, height: 450 }, // Right side
      { x: 50, y: 400, width: 700, height: 100 }, // Top side
      //add additional road sections
    ];

    const platforms = [
      { x: 10, y: 200, width: 40, height: 100, color: "blue", platform: 1 }, // Origin platform
      { x: 750, y: 400, width: 40, height: 100, color: "green", platform: 2 }, // Destination platform
      { x: 355, y: 0, width: 100, height: 40, color: "orange", platform: 3 }, // Additional platform
      { x: 355, y: 500, width: 100, height: 40, color: "red", platform: 4 }, // Additional platform
      // Add more platforms as needed
    ];

    if (!canvas || !context) return;

    const drawCircuit = () => {
      context.fillStyle = "gray"; // Road color

      // Draw each section of the square circuit
      roadSections.forEach((section) => {
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

    const isItemOnRoad = (item: Item): boolean => {
      return roadSections.some(
        (section) =>
          item.x > section.x &&
          item.x + item.width < section.x + section.width &&
          item.y > section.y &&
          item.y + item.height < section.y + section.height
      );
    };

    const validMoveItemOnX = (item: Item, direction: string): boolean => {
      if (direction === "-x") {
        if (item.x - item.speed < 0) {
          return false;
        } else {
          return isItemOnRoad({ ...item, x: item.x - item.speed });
        }
      } else if (direction === "+x") {
        if (item.x + item.width + item.speed > canvas.width || item.x < 0)
          return false;

        return isItemOnRoad({ ...item, x: item.x + item.speed });
      }

      return false;
    };

    const validMoveItemOnY = (item: Item, direction: string): boolean => {
      if (direction === "-y") {
        if (item.y - item.speed < 0) {
          return false;
        } else {
          return isItemOnRoad({ ...item, y: item.y - item.speed });
        }
      } else if (direction === "+y") {
        if (item.y + item.height + item.speed > canvas.height || item.y < 0) {
          return false;
        } else {
          return isItemOnRoad({ ...item, y: item.y + item.speed });
        }
      }

      return false;
    };

    const validItemOnOriginPlatform = (item: Item): boolean => {
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
      item: Item,
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

    const validItemOnDestinationPlatform = (item: Item): boolean => {
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

    const distanceToNearestSection = (item: Item, platform: any) => {
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

    const movedToNearestRoadSection = (item: Item) => {
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

    const distanceToNearestSectionInX = (item: Item, platform: any) => {
      const distancePositive = Math.abs(item.x + item.width - platform.x);
      const distanceNegative = Math.abs(item.x - platform.x + platform.width);

      return distancePositive < distanceNegative
        ? distancePositive
        : distanceNegative;
    };

    const distanceToNearestSectionInY = (item: Item, platform: any) => {
      const distancePositive = Math.abs(item.y + item.height - platform.y);
      const distanceNegative = Math.abs(item.y - platform.y + platform.height);

      return distancePositive < distanceNegative
        ? distancePositive
        : distanceNegative;
    };

    const movedToDirection = (item: Item): string => {
      const platform = platforms.find(
        (p) => p.platform === item.platformDestination
      );

      if (!platform) return "stop";

      if (item.status === "block") {
        if (
          (item.orientation === "top" && !validMoveItemOnY(item, "-y")) ||
          (item.orientation === "bottom" && !validMoveItemOnY(item, "+y"))
        ) {
          const searchSections = roadSections.filter(
            (section) =>
              item.y - item.height >= section.y &&
              item.y + item.height <= section.y + section.height - item.height
          );

          const nearestSection = searchSections.reduce((a, b) => {
            return distanceToNearestSectionInX(item, b) <
              distanceToNearestSectionInX(item, a)
              ? b
              : a;
          }, searchSections[0]);

          if (!nearestSection) return "stop";

          if (
            item.x + item.width >=
            nearestSection.x + nearestSection.width - item.width
          ) {
            console.log("item", item);

            return "left";
          } else if (item.x <= nearestSection.x + nearestSection.width) {
            return "right";
          }

          console.log("block top");
        } else if (item.orientation === "top" && validMoveItemOnY(item, "-y")) {
          item.status = "running";
          return "top";
        } else if (
          item.orientation === "bottom" &&
          validMoveItemOnY(item, "+y")
        ) {
          item.status = "running";
          return "bottom";
        }
      } else {
        if (
          item.x + item.width >= platform.x + platform.width &&
          validMoveItemOnX(item, "-x")
        ) {
          item.orientation = "left";
          return "left";
        }
        if (item.x <= platform.x && validMoveItemOnX(item, "+x")) {
          item.orientation = "right";
          return "right";
        }
        if (
          item.y + item.height >= platform.y + platform.height &&
          validMoveItemOnY(item, "-y")
        ) {
          item.orientation = "top";
          return "top";
        }
        if (item.y <= platform.y && validMoveItemOnY(item, "+y")) {
          item.orientation = "bottom";
          return "bottom";
        }
      }

      return "block";
    };

    const updateItemPosition = (item: Item, movedDirection: string) => {
      if (movedDirection === "left") {
        item.x -= item.speed;
      } else if (movedDirection === "right") {
        item.x += item.speed;
      } else if (movedDirection === "top") {
        item.y -= item.speed;
      } else if (movedDirection === "bottom") {
        item.y += item.speed;
      } else {
        // Do nothing
        item.status = "block";
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCircuit(); // Draw the circuit

      items.forEach((item) => {
        // Set the item color
        context.fillStyle = item.color;

        // Draw the item when start in the origin platform
        if (item.x === -1 && item.y === -1) {
          const platform = platforms.find(
            (p) => p.platform === item.platformOrigin
          );
          if (!platform) return;

          item.x = platform.x + platform.width / 2;
          item.y = platform.y + platform.height / 2;
        } else if (validItemOnDestinationPlatform(item)) {
          item.x = -1;
          item.y = -1;
        } else if (validItemOnOriginPlatform(item)) {
          movedToNearestRoadSection(item);
        } else {
          // Move the item to platform destination
          const movedDirection = movedToDirection(item);

          updateItemPosition(item, movedDirection);
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

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={535}
      style={{ border: "1px solid black" }}
    />
  );
};

export default TransportBand;
