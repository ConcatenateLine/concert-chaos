import ProfileDropDownMenuComponent from "./ProfileDropDownMenu.component";

function HeaderContainer() {
  return (
    <div className="header p-2 w-full text-center relative">
      <span className="text-white text-2xl absolute top-0 right-0">
        <ProfileDropDownMenuComponent />
      </span>
      <h1 className="text-6xl">Concert Chaos </h1>
      <h1 className="text-6xl">2025</h1>
    </div>
  );
}

export default HeaderContainer;
