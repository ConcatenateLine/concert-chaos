interface ScoreSectionProps {
  username: string;
  score: number;
  reasonForFire?: string;
  marked?: boolean;
}

const ScoreSectionComponent = ({
  username,
  score,
  reasonForFire = "You have been fired for no reason",
  marked = false,
}: ScoreSectionProps) => {
  return (
    <div className="md:w-11/12 lg:flex first:col-start-1 text-white first:col-end-3 first:text-emojiColor first:justify-center justify-start items-center">
      <div className="overflow-hidden max-w-6/12 text-8xl font-rushford min-w-fit">
        {score}
      </div>
      <div className="max-w-5/12 p-2">
        <p className={marked ? "text-emojiColor" : "text-white"}>{username}</p>
        <p className="text-gray-400 text-wrap">
          {marked ? <span className="text-white text-sm">Latest </span> : ""}
          {reasonForFire ?? "You have been fired for no reason"}
        </p>
      </div>
    </div>
  );
};

export default ScoreSectionComponent;
