import BoxInterface from "../../box/interfaces/Box.interface";
import MenuBoxStatusComponent from "./MenuBoxStatus.component";
import BoxColors from "../../box/utils/BoxColors.utils";

interface MenuBoxStatusSummaryProps {
  boxes: BoxInterface[];
}
const MenuBoxStatusSummaryComponent = ({
  boxes,
}: MenuBoxStatusSummaryProps) => {
  // TODO: Implement this component
  const boxesRun = boxes.filter((box) => box.color === BoxColors[0]);
  const boxesBlocked = boxes.filter((box) => box.color === BoxColors[1]);
  const boxesWaiting = boxes.filter((box) => box.color === BoxColors[2]);
  const boxesDelivered = boxes.filter((box) => box.color === BoxColors[3]);

  return (
    <>
      <MenuBoxStatusComponent color={BoxColors[0]} count={boxesRun.length} />
      <MenuBoxStatusComponent
        color={BoxColors[1]}
        count={boxesBlocked.length}
      />
      <MenuBoxStatusComponent
        color={BoxColors[2]}
        count={boxesWaiting.length}
      />
      <MenuBoxStatusComponent
        color={BoxColors[3]}
        count={boxesDelivered.length}
      />
    </>
  );
};

export default MenuBoxStatusSummaryComponent;
