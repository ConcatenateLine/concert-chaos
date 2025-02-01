// Function to create a grid representation of the road sections

import SquareInterface from "../interfaces/Square.interface";

// Recive the road sections and the grid size (the size of the square unit)
export const createGridBoard = (
  localConveyors: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>,
  gridUnitSize: number
): SquareInterface[][] => {
  const grid: SquareInterface[][] = [];

  // Determine the size of the grid based on the road sections
  const maxWidth = Math.max(
    ...localConveyors.map((section) => section.x + section.width)
  );
  const maxHeight = Math.max(
    ...localConveyors.map((section) => section.y + section.height)
  );

  // Initialize the grid
  for (let y = 0; y < maxHeight; y += gridUnitSize) {
    const row: SquareInterface[] = [];
    for (let x = 0; x < maxWidth; x += gridUnitSize) {
      // Check if the grid cell is within any road section
      const isRoad = localConveyors.some(
        (section) =>
          x >= section.x &&
          x < section.x + section.width &&
          y >= section.y &&
          y < section.y + section.height
      );
      row.push({ isRoad: isRoad, onRoad: 0 });
    }
    grid.push(row);
  }
  return grid;
};
