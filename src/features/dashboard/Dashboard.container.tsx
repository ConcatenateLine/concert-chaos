import TransportationBandContainer from "../TransportationBand/TransportationBand.container";

const DashboardContainer = () => {
  // TODO: Add Dashboard Logic
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-10/12 h-4/6 flex self-center">
        <TransportationBandContainer />
      </div>
      <div className="border">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default DashboardContainer;
