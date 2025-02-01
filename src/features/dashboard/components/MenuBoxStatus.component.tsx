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
      className={`flex flex-col p-1 border items-center justify-start text-sm text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="text-white">{count}</span>
    </div>
  );
};

export default MenuBoxStatusComponent;
