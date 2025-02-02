interface ScoreProps {
  title: string;
  count: number;
}

const MenuScoreComponent = ({ title, count }: ScoreProps) => {
  return (
    <div className="min-w-32 flex flex-col p-1 items-center text-white">
      <span className="lg:text-2xl">{title}</span>
      <span className="text-2xl lg:text-8xl">{count}</span>
    </div>
  );
};

export default MenuScoreComponent;
