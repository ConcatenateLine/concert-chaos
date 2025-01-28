import { useState } from "react";
import ConveyorContainer from "../Conveyor/Conveyor.container";
import BoxInterface from "../box/interfaces/Box.interface";
import ConveyorInterface from "../Conveyor/interfaces/Conveyor.interface";
import MenuPackingStationComponent from "./components/MenuPackingStation.component";
import BoxColors from "../box/utils/BoxColors.utils";
import PackingStationInterface from "../packingStation/interfaces/PackingStation";
import MenuBoxComponent from "./components/MenuBox.component";

const DashboardContainer = () => {
  const [packingStations, setPackingStations] = useState<
    PackingStationInterface[]
  >([
    {
      x: 50,
      y: 200,
      width: 40,
      height: 100,
      status: "stop",
      speed: 1,
      color: BoxColors[0],
      id: 1,
    },
    {
      x: 750,
      y: 400,
      width: 40,
      height: 100,
      color: BoxColors[1],
      id: 2,
      speed: 1,
      status: "run",
    },
  ]);
  const [conveyors, setConveyors] = useState<ConveyorInterface[]>([]);
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
  ]);

  // TODO: Add Dashboard Logic
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="w-full h-4/5 flex justify-center">
        <ConveyorContainer />
      </div>
      <div className="fixed pl-48 bottom-16 w-full h-32  gap-4 flex">
        <div className="border w-2/5 p-1 grid lg:grid-cols-3 lg:grid-rows-2 gap-2 overflow-y-auto">
          {packingStations.map((packingStation) => (
            <MenuPackingStationComponent
              key={packingStation.id}
              packingStation={packingStation}
            />
          ))}
        </div>
        <div className="border w-2/5 p-1 grid lg:grid-cols-3 lg:grid-rows-2 gap-2 overflow-y-auto">
          {boxes.map((box) => (
            <MenuBoxComponent key={box.id} box={box} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
