import MenuPackingStationComponent from "./components/MenuPackingStation.component";
import MenuBoxComponent from "./components/MenuBox.component";
import BoardContainer from "../board/board.container";
import useBoard from "../board/hooks/useBoard";
import MenuScoreComponent from "./components/MenuScore.component";
import MenuModalGameComponent from "./components/MenuModalGame.component";
import MenuBoxStatusSummaryComponent from "./components/MenuBoxStatusSummary.component";

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
    // Box state update
    updateBoxes,
    addBox,
    updateBox,
    // Packing Station state update
    updatePackingStationSpeed,
    updatePackingStationStatus,
    // Board state update
    resetBoard,
    gameOver,
  } = useBoard();

  // TODO: Add Dashboard Logic
  return (
    <div className="relative w-full h-full flex flex-col">
      <MenuModalGameComponent
        isOpen={gameOver}
        onClose={resetBoard}
        delivered={delivered}
        blocked={blocked}
        level={level}
      />
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
          updateBoxes={updateBoxes}
          addBox={addBox}
          updateBox={updateBox}
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
              updateSpeed={updatePackingStationSpeed}
              updateStatus={updatePackingStationStatus}
            />
          ))}
        </div>
        <div className="lg:flex border w-[46%] p-1 gap-2 overflow-y-auto">
          <div className="lg:w-1/5 grid grid-cols-2 grid-rows-2">
            <MenuBoxStatusSummaryComponent boxes={boxes} />
          </div>

          <div className="lg:w-4/5 grid lg:grid-cols-6 lg:grid-rows-2 gap-2 overflow-y-auto">
            {boxes.map((box) => (
              <MenuBoxComponent
                key={`${box.id} ${box.platformOrigin}`}
                box={box}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
