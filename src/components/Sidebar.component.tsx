import { NavLink } from "react-router";

const SidebarComponent = () => {
  return (
    <nav className="w-1/4 h-3/4 bg-slate-600 flex flex-col">
      <NavLink to="/" className="p-2">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} Home
          </span>
        )}
      </NavLink>
      <NavLink to="/dashboard" className="p-2">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} Dashboard
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export default SidebarComponent;
