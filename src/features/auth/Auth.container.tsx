import useBoard from "../board/hooks/useBoard";
import AuthBackgroudComponent from "./components/AuthBackgroud.component";

const AuthContainer = () => {
  const { latestScore } = useBoard();

  return (
    <div className="w-full h-full">
      <AuthBackgroudComponent />
      <div className="fixed top-26 left-10 bottom-16 right-10 h-36  gap-4 flex justify-between text-white items-end">
        <div className="hidden md:block md:w-[17%]"></div>
        <div className="w-[83%] grid lg:grid-cols-2 gap-4 md:gap-0 text-2xl">
          <div className="text-sm lg:text-2xl">
            <div className="flex flex-col">
              <span>🚚 {latestScore?.user ?? "Guest"}</span>
              <span>{latestScore?.reasonForFire ?? "You got fired!"}</span>
            </div>
          </div>
          <span className="lg:text-8xl header text-emoji-color">
            {latestScore?.score ?? 0}{" "}
            <span className="text-white text-2xl">boxes</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
