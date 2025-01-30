import useBoard from "../board/hooks/useBoard";
import ScoreSectionComponent from "./components/ScoreSection.component";

const ScoresContainer = () => {
  const { scores } = useBoard();
  return (
    <div className="w-full md:pl-44 grid grid-cols-2 gap-4 max-w-screen-xl">
      {scores.map((score, index) => (
        <ScoreSectionComponent
          key={index}
          username={score.user}
          score={score.score}
        />
      ))}
    </div>
  );
};

export default ScoresContainer;
