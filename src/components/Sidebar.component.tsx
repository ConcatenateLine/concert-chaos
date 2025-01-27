import { NavLink } from "react-router";

const SidebarComponent = () => {
  return (
    <nav className="fixed left-10 bottom-16 border text-white flex flex-col bg-background md:bg-transparent">
      <NavLink to="/" className="menu p-2 min-w-32">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} Home
          </span>
        )}
      </NavLink>
      <NavLink to="/dashboard" className="menu p-2 min-w-32">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} Dashboard
          </span>
        )}
      </NavLink>
      <NavLink to="/about" className="menu p-2 min-w-32">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} About
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export default SidebarComponent;
