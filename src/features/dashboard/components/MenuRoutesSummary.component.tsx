import MenuBoxStatusComponent from "./MenuBoxStatus.component";
import RouteInterface from "../../Conveyor/interfaces/Route.interface";

interface MenuBoxStatusSummaryProps {
  routes: RouteInterface[];
}
const MenuRoutesSummaryComponent = ({ routes }: MenuBoxStatusSummaryProps) => {
  const routeA = routes.filter((route) => route.start === 1);
  const routeB = routes.filter((route) => route.start === 2);
  const routeC = routes.filter((route) => route.start === 3);
  const routeD = routes.filter((route) => route.start === 4);
  const routeE = routes.filter((route) => route.start === 5);
  const routeF = routes.filter((route) => route.start === 6);
  const routeG = routes.filter((route) => route.start === 7);

  return (
    <>
      <MenuBoxStatusComponent color={routeA[0]?.color} count={routeA.length} />
      <MenuBoxStatusComponent color={routeB[0]?.color} count={routeB.length} />
      <MenuBoxStatusComponent color={routeC[0]?.color} count={routeC.length} />
      <MenuBoxStatusComponent color={routeD[0]?.color} count={routeD.length} />
      <MenuBoxStatusComponent color={routeE[0]?.color} count={routeE.length} />
      <MenuBoxStatusComponent color={routeF[0]?.color} count={routeF.length} />
      <MenuBoxStatusComponent color={routeG[0]?.color} count={routeG.length} />
    </>
  );
};

export default MenuRoutesSummaryComponent;
