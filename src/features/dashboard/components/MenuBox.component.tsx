import BoxInterface from "../../box/interfaces/Box.interface";

interface BoxProps {
  box: BoxInterface;
}

const MenuBoxComponent = ({ box }: BoxProps) => {
  return (
    <div className="flex flex-col p-1 border items-center text-white">
      <div className="w-full text-sm flex justify-between">
        <span>{box.status}</span>
        {/* <span>No. {packingStation.id}</span> */}
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="flex gap-2 text-gray-600 dark:text-gray-400"></span>
      </div>
    </div>
  );
};

export default MenuBoxComponent;
