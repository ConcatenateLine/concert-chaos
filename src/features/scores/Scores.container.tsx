import useBoard from "../board/hooks/useBoard";
import ScoreSectionComponent from "./components/ScoreSection.component";

const ScoresContainer = () => {
  const { scores, latestScore } = useBoard();

  return (
    <div className="w-full md:pl-44 grid grid-cols-2 gap-4 max-w-screen-xl flex-col-reverse">
      {scores.map((score, index) => (
        <ScoreSectionComponent
          key={index}
          username={score.user}
          reasonForFire={score.reasonForFire}
          score={score.score}
          marked={
            score.user === latestScore?.user &&
            latestScore.score === score.score
          }
        />
      ))}
    </div>
  );
};

export default ScoresContainer;
