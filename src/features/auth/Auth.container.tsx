import useBoard from "../board/hooks/useBoard";
import AuthBackgroudComponent from "./components/AuthBackgroud.component";

const AuthContainer = () => {
  const { latestScore } = useBoard();

  return (
    <div className="w=full h=full">
      <AuthBackgroudComponent />
      <div className="fixed md:pl-64 p-4 md:w-4/5 bottom-64 lg:bottom-16 h-36 text-white">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-0 text-2xl">
          <div className="text-2xl">
            <div className="flex flex-col">
              <span className="text-2xl">🚚 {latestScore?.user ?? "Guest"}</span>
              <span className="text-2xl">
                {latestScore?.reasonForFire ?? "You got fired!"}
              </span>
            </div>
          </div>
          <span className="text-8xl header text-emoji-color">
            {latestScore?.score ?? 0}{" "}
            <span className="text-white text-2xl">boxes</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
