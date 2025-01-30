interface ScoreSectionProps {
  username: string;
  score: number;
}

const ScoreSectionComponent = ({ username, score }: ScoreSectionProps) => {
  return (
    <div className="md:w-11/12 lg:flex first:col-start-1 text-white first:col-end-3 first:text-emojiColor justify-center items-center">
      <div className="overflow-hidden max-w-6/12 text-8xl">{score}</div>
      <div className="max-w-5/12 p-2">
        <p className="text-white">Score</p>
        <p className="text-gray-400 text-wrap">{username ?? "Guest"}</p>
      </div>
    </div>
  );
};

export default ScoreSectionComponent;
