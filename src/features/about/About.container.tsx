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
