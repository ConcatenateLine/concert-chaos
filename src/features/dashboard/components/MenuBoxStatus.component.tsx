interface BoxProps {
  color: string;
  count: number;
  className?: string;
}

const MenuBoxStatusComponent = ({
  color = "#43434343",
  count = 0,
  className,
}: BoxProps) => {
  return (
    <div
      className={`flex flex-col p-1 border items-center justify-center text-2xl text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="p-1 text-white">{count}</span>
    </div>
  );
};

export default MenuBoxStatusComponent;
