import MenuPackingStationComponent from "./components/MenuPackingStation.component";
import MenuBoxComponent from "./components/MenuBox.component";
import BoardContainer from "../board/board.container";
import useBoard from "../board/hooks/useBoard";
import MenuScoreComponent from "./components/MenuScore.component";
import MenuModalGameComponent from "./components/MenuModalGame.component";
import MenuRoutesSummaryComponent from "./components/MenuRoutesSummary.component";

const DashboardContainer = () => {
  const {
    boxesDelivered,
    boxesBlocked,
    boxesCollisions,
    level,
    packingStations,
    conveyors,
    boxes,
    routes,
    updateBoxesDelivered,
    updateBoxesCollisions,
    updateRoutes,
    // Box state update
    addBox,
    // Packing Station state update
    updatePackingStationSpeed,
    updatePackingStationStatus,
    // Board state update
    resetBoard,
    gameOver,
    reasonForFire,
    // Time state
    lastTime,
    currentTime,
    updateLastTime,
    updateBoard,
  } = useBoard();

  // TODO: Add Dashboard Logic
  return (
    <div className="relative w-full h-full flex flex-col">
      <MenuModalGameComponent
        isOpen={gameOver}
        onClose={resetBoard}
        boxesDelivered={boxesDelivered}
        boxesBlocked={boxesBlocked}
        boxesCollisions={boxesCollisions}
        level={level}
        reasonForFire={reasonForFire}
      />
      <div className="fixed top-26 left-10 right-10 h-32  gap-4 flex justify-between">
        <MenuScoreComponent title="Delivered" count={boxesDelivered} />
        <MenuScoreComponent title="Blocked" count={boxesBlocked} />
      </div>
      <div className="fixed top-72 left-10 right-10 h-32  gap-4 flex justify-between">
        <MenuScoreComponent title="Level" count={level} />
        <MenuScoreComponent title="Collisions" count={boxesCollisions} />
      </div>
      <div className="w-full h-[50%] lg:h-[70%] md:flex justify-center contents">
        <BoardContainer
          conveyors={conveyors}
          boxes={boxes}
          packingStations={packingStations}
          routes={routes}
          lastTime={lastTime}
          currentTime={currentTime}
          addBox={addBox}
          updateBoxesDelivered={updateBoxesDelivered}
          updateBoxesCollisions={updateBoxesCollisions}
          updateRoutes={updateRoutes}
          updateLastTime={updateLastTime}
          updateBoard={updateBoard}
        />
      </div>
      <div className="fixed top-26 left-10 bottom-16 right-10 h-36  gap-4 flex justify-between">
        <div className="hidden md:block md:w-[17%]"></div>
        <div className="border md:w-[47%]  p-1 grid lg:grid-cols-3 gap-2 overflow-y-auto">
          {packingStations.map((packingStation) => (
            <MenuPackingStationComponent
              key={"ps" + packingStation.id}
              packingStation={packingStation}
              updateSpeed={updatePackingStationSpeed}
              updateStatus={updatePackingStationStatus}
            />
          ))}
        </div>
        <div className="lg:flex border w-[35%] p-1 gap-2 overflow-y-auto">
          <div className="lg:w-1/5 grid grid-cols-2 gap-2">
            <MenuRoutesSummaryComponent routes={routes} />
          </div>

          <div className="lg:w-4/5 grid lg:grid-cols-5 gap-2 overflow-y-auto">
            {boxes.map((box) => (
              <MenuBoxComponent
                key={`b${box.id} ${box.platformOrigin}`}
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
