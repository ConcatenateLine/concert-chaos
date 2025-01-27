import AboutSectionComponent from "./components/AboutSection.component";
import BlockedSvgComponent from "./components/BlockedSvg.component";
import BoardGameSvgComponent from "./components/BoardGameSvg.component";
import DeliveredSvgComponent from "./components/DeliveredSvg.component";
import MenuSvgComponent from "./components/MenuSvg.component";
import PackagesStateSvgComponent from "./components/PackagesStateSvg.component";
import PlatformsStateSvgComponent from "./components/PlatformsStateSvg.component";

const AboutContainer = () => {
  return (
    <div className="w-full md:pl-44 grid gap-4">
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
        content="Representation of the time between packets served by each platform."
        children={<PlatformsStateSvgComponent />}
      />
      <AboutSectionComponent
        title="Packages state"
        content="Representation of the state of each package."
        children={<PackagesStateSvgComponent />}
      />
    </div>
  );
};

export default AboutContainer;
