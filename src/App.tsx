import { Outlet } from "react-router";
import FooterContainer from "./components/Footer.container";
import HeaderContainer from "./components/Header.container";
import SidebarComponent from "./components/Sidebar.component";

function App() {
  return (
    <div className="w-full h-screen flex flex-col p-4">
      <HeaderContainer />
      <div className="relative flex w-full h-full justify-center overflow-y-auto">
        <SidebarComponent />
        <Outlet />
      </div>
      <FooterContainer />
    </div>
  );
}

export default App;
