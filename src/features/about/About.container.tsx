import AboutSectionComponent from "./components/AboutSection.component";
import BlockedSvgComponent from "./components/BlockedSvg.component";
import BoardGameSvgComponent from "./components/BoardGameSvg.component";
import BoxSvgComponent from "./components/BoxSvg.component";
import CollisionSvgCcomponent from "./components/CollisionSvg.component";
import DeliveredSvgComponent from "./components/DeliveredSvg.component";
import LevelSvgComponent from "./components/LevelSvg.component";
import MenuSvgComponent from "./components/MenuSvg.component";
import PackagesStateSvgComponent from "./components/PackagesStateSvg.component";
import PackingStationSvgComponent from "./components/PackingStationSvg.component";
import PlatformsStateSvgComponent from "./components/PlatformsStateSvg.component";
import RemainingBarSVGComponent from "./components/RemainingBarSVG.component";

const AboutContainer = () => {
  return (
    <div className="w-full md:pl-44 grid gap-4 max-w-screen-xl">
      <AboutSectionComponent
        title="About"
        content="Concert Chaos is a game where you have to deliver as many packages as possible before time runs out.
         You can control the time of each packing station for optimum performance, prevent collisions, and improve your score."
      />
      <AboutSectionComponent
        title=""
        content="- You have levels, the game is over when you incur a collision, a package is blocked, or the time runs out."
      />
      <AboutSectionComponent
        title=""
        content="- Each level have a specific time and add some elements, so be careful!"
      />
      <AboutSectionComponent
        title=""
        content=" - You can control the time of each packing station to optimize the delivery speed."
      />
      <AboutSectionComponent
        title=""
        content=" - Packing stations can be in 3 states: Running, Stopped, and Removed (when the level starts)."
      />
      <AboutSectionComponent
        title=""
        content=" - When a level starts, all packing stations are set to Stopped. So when a level starts, you have to start controlling the packing stations."
      />
      <AboutSectionComponent
        title=""
        content=" - Collisions and blocked packages are penalized, and have a limited quantity per level."
      />
      <AboutSectionComponent
        title=""
        content=" - A blocked package is a package that cannot be delivered because a package with the same id is already in the board."
      />
      <AboutSectionComponent
        title=""
        content=" - A collided package is a package that cannot be delivered because he collides with another package and is discarded."
      />
      <AboutSectionComponent
        title=""
        content="- When a level starts, the remaining time bar is set to the level time."
      />
      <AboutSectionComponent
        title=""
        content="- The remaining time bar decreases more quickly as the game progresses."
      />

      <br></br>
      <br></br>

      <AboutSectionComponent title="Elements of the game" content="" />

      <AboutSectionComponent
        title="Remaining time bar"
        content="Bar displaying the remaining time for the current level in the bottom of the board."
        children={<RemainingBarSVGComponent />}
      />
      <AboutSectionComponent
        title="Packages delivered"
        content="Packages transported from one platform to another."
        children={<DeliveredSvgComponent />}
      />
      <AboutSectionComponent
        title="Blocked packages"
        content="Packages transported from one platform to another."
        children={<BlockedSvgComponent />}
      />
      <AboutSectionComponent
        title="Packages collided"
        content="Packages collided with each other."
        children={<CollisionSvgCcomponent />}
      />
      <AboutSectionComponent
        title="Levels"
        content="Levels represent the difficulty of the game."
        children={<LevelSvgComponent />}
      />
      <AboutSectionComponent
        title="Game Board"
        content="Visual representation of the game logic."
        children={<BoardGameSvgComponent />}
      />
      <AboutSectionComponent
        title="Menu"
        content="Navigation between sections of the website."
        children={<MenuSvgComponent />}
      />
      <AboutSectionComponent
        title="Platforms state"
        content="Representation of the time between packets served by each platform and the control station."
        children={<PlatformsStateSvgComponent />}
      />
      <AboutSectionComponent
        title="Packages state"
        content="Representation of the state of each package and the summary of the routes by each packing station."
        children={<PackagesStateSvgComponent />}
      />
      <AboutSectionComponent
        title="Packing station"
        content="Representation of the state of each packing station."
        children={<PackingStationSvgComponent />}
      />
      <AboutSectionComponent
        title="Box"
        content="Representation of the state of each box."
        children={<BoxSvgComponent />}
      />
    </div>
  );
};

export default AboutContainer;
