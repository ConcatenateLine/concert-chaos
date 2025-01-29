import PackingStationInterface from "../../packingStation/interfaces/PackingStation.interface";

interface PackingStationProps {
  packingStation: PackingStationInterface;
}

const MenuPackingStationComponent = ({
  packingStation,
}: PackingStationProps) => {
  return (
    <div className="flex flex-col p-1 border items-center text-white">
      <div className="w-full text-sm flex justify-between">
        <span>{packingStation.status}</span>
        <span>No. {packingStation.id}</span>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="flex gap-2 text-gray-600 dark:text-gray-400 text-2xl">
          <span>+</span>
          <span>
            {packingStation.speed} <span className="text-white text-sm">s</span>
          </span>
          <span>-</span>
        </span>
      </div>
    </div>
  );
};

export default MenuPackingStationComponent;
