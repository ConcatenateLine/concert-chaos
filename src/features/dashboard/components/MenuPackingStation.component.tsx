import StatusAction from "../../board/enums/StatusAction";
import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

interface PackingStationProps {
  packingStation: PackingStationInterface;
  updateSpeed?: (id: number, speedOption: string) => void;
  updateStatus?: (id: number, statusOption: string) => void;
}

const MenuPackingStationComponent = ({
  packingStation,
  updateSpeed,
  updateStatus,
}: PackingStationProps) => {
  const handleSpeedChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!event.currentTarget.ariaLabel) return;
    if (updateSpeed)
      updateSpeed(packingStation.id, event.currentTarget.ariaLabel);
  };

  const handleStatusChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!event.currentTarget.ariaLabel) return;
    if (updateStatus)
      updateStatus(packingStation.id, event.currentTarget.ariaLabel);
  };

  return (
    <div className="flex flex-col p-1 border items-center text-white">
      <div className="w-full text-sm flex justify-between">
        <span>{packingStation.status}</span>
        {packingStation.status !== StatusAction.RUN && (
          <button
            className="text-gray-400 hover:text-yellow-400"
            aria-label="Run"
            onClick={handleStatusChange}
          >
            Run
          </button>
        )}
        {packingStation.status !== StatusAction.STOP && (
          <button
            className="text-gray-400 hover:text-yellow-400"
            aria-label="Stop"
            onClick={handleStatusChange}
          >
            Stop
          </button>
        )}
        {packingStation.status !== StatusAction.REMOVE && (
          <button
            className="text-gray-400 hover:text-yellow-400"
            aria-label="Remove"
            onClick={handleStatusChange}
          >
            Remove
          </button>
        )}
        <span style={{ backgroundColor: packingStation.color }}>
          No. {packingStation.id}
        </span>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="flex gap-2 text-gray-400 text-2xl">
          <button
            className="text-white text-2xl border w-8 h-8 hover:bg-foreground"
            aria-label="Increase speed"
            onClick={handleSpeedChange}
          >
            +
          </button>
          <span>
            {packingStation.speed} <span className="text-white text-sm">s</span>
          </span>
          <button
            className="text-white text-2xl border w-8 h-8 hover:bg-foreground"
            aria-label="Decrease speed"
            onClick={handleSpeedChange}
          >
            -
          </button>
        </span>
      </div>
    </div>
  );
};

export default MenuPackingStationComponent;
