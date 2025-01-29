interface MenuDropDownProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const MenuDropDownComponent = ({
  isOpen,
  toggleMenu,
  logout,
  login,
  isAuthenticated,
}: MenuDropDownProps) => {
  const signIn = async () => {
    try {
      toggleMenu();
      await login("Casper");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signOut = async () => {
    try {
      toggleMenu();
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden transition-transform duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 hidden "
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <button
        className="w-full hover:bg-gray-200 rounded-lg block px-4 py-2 text-sm text-gray-700"
        aria-label="Scores"
      >
        Scores
      </button>
      {isAuthenticated ? (
        <button
          className=" w-full hover:bg-gray-200 rounded-lg block px-4 py-2 text-center text-sm text-gray-700"
          aria-label="Sign out"
          onClick={signOut}
        >
          Sign out
        </button>
      ) : (
        <button
          className="w-full hover:bg-gray-200 rounded-lg block px-4 py-2 text-center text-sm text-gray-700"
          aria-label="Sign in"
          onClick={signIn}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default MenuDropDownComponent;
