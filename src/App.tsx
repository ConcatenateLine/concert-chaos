import { Outlet } from "react-router";
import FooterContainer from "./components/Footer.container";
import HeaderContainer from "./components/Header.container";
import SidebarComponent from "./components/Sidebar.component";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <HeaderContainer />
      <div className="flex w-full h-full">
        <SidebarComponent />
        <Outlet />
      </div>
      <FooterContainer />
    </div>
  );
}

export default App;
