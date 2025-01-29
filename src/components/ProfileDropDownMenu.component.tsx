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
          className="p-1 relative flex rounded-full bg-background text-sm ring-2 ring-foreground focus:ring-white"
          aria-label="User menu button"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="size-10 rounded-full"
            alt="Profile User"
            src={
              isAuthenticated
                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                : "https://plus.unsplash.com/premium_vector-1727952231760-ce774734b2c9?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
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
