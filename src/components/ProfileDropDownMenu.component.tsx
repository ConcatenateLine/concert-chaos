import { useState } from "react";
import MenuDropDownComponent from "./MenuDropDown.component";
import useAuth from "../features/auth/hooks/useAuth";

const ProfileDropDownMenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative ml-3 font-general">
        <button
          type="button"
          className="p-1 relative flex rounded-md bg-background text-sm ring-2 ring-foreground focus:ring-white"
          aria-label="User menu button"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="size-10"
            alt="ConcertChaos"
            src="./concertChaos.svg"
          />
        </button>
        <MenuDropDownComponent
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          isAuthenticated={isAuthenticated}
          logout={logout}
          login={login}
        />
      </div>
      {/* Overlay to close the menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-20"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default ProfileDropDownMenuComponent;
