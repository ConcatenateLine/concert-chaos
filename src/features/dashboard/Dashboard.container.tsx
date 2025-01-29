import MenuPackingStationComponent from "./components/MenuPackingStation.component";
import MenuBoxComponent from "./components/MenuBox.component";
import MenuBoxStatusComponent from "./components/MenuBoxStatus.component";
import BoardContainer from "../board/board.container";
import { useBoard } from "../board/hooks/useBoard";
import MenuScoreComponent from "./components/MenuScore.component";

const DashboardContainer = () => {
  const {
    delivered,
    blocked,
    level,
    packingStations,
    conveyors,
    boxes,
    routes,
    updateDelivered,
    updateBlocked,
    updateLevel,
    updateRoutes,
  } = useBoard();

  // TODO: Add Dashboard Logic
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="fixed top-26 left-10 right-10 h-32  gap-4 flex justify-between">
        <MenuScoreComponent title="Delivered" count={delivered} />
        <MenuScoreComponent title="Blocked" count={blocked} />
      </div>
      <div className="w-full h-4/5 flex justify-center">
        <BoardContainer
          conveyors={conveyors}
          boxes={boxes}
          packingStations={packingStations}
          routes={routes}
          updateDelivered={updateDelivered}
          updateBlocked={updateBlocked}
          updateLevel={updateLevel}
          updateRoutes={updateRoutes}
        />
      </div>
      <div className="fixed pl-60 bottom-16 w-full h-36 gap-4 flex">
        <div className="border w-[49%]  p-1 grid lg:grid-cols-3 lg:grid-rows-2 gap-2 overflow-y-auto">
          {packingStations.map((packingStation) => (
            <MenuPackingStationComponent
              key={packingStation.id}
              packingStation={packingStation}
            />
          ))}
        </div>
        <div className="lg:flex border w-[46%] p-1 gap-2 overflow-y-auto">
          <div className="lg:w-1/5 grid grid-cols-2 grid-rows-2">
            <MenuBoxStatusComponent color="#c3c3c3c3" count={2} />
            <MenuBoxStatusComponent color="#c3c3c3c3" count={2} />
            <MenuBoxStatusComponent color="#c3c3c3c3" count={2} />
            <MenuBoxStatusComponent color="#c3c3c3c3" count={2} />
          </div>

          <div className="lg:w-4/5 grid lg:grid-cols-6 lg:grid-rows-2 gap-2 overflow-y-auto">
            {boxes.map((box) => (
              <MenuBoxComponent key={box.id} box={box} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
