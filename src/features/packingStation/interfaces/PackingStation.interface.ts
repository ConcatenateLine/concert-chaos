interface PackingStationInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  lastDeliveryTime?: number;
  status: string;
  id: number;
}

export default PackingStationInterface;
