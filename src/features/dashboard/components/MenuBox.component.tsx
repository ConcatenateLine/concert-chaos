import BoxInterface from "../../box/interfaces/Box.interface";

interface BoxProps {
  box: BoxInterface;
}

const MenuBoxComponent = ({ box }: BoxProps) => {
  return (
    <div
      className="flex flex-col p-1 border items-center text-white"
      style={{ backgroundColor: box.color }}
    >
      <span>{box.status}</span>
      <span className="text-sm"><span className="text-white text-sm">No. </span>{box.id}</span>
    </div>
  );
};

export default MenuBoxComponent;
