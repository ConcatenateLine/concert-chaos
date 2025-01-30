interface MenuModalGameProps {
  isOpen: boolean;
  onClose: () => void;
  delivered: number;
  blocked: number;
  level: number;
}

const MenuModalGameComponent = ({
  isOpen,
  onClose,
  delivered = 0,
  blocked = 0,
  level = 0,
}: MenuModalGameProps) => {
  const handleContinue = () => {
    onClose();
  };

  return (
    <div
      className="relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-background z-20 transition-transform duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 hidden"
        }`}
        aria-hidden="true"
      ></div>

      <div
        className={`fixed inset-0 w-screen overflow-y-auto ${
          isOpen ? "z-30" : "hidden"
        }`}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 relative">
          <div
            className={`border transform overflow-hidden rounded-lg text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg transition-transform duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 hidden "
            }`}
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-white">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-4xl" id="modal-title">
                    Game over
                  </h3>
                  <div className="mt-2">
                    <p className="text-2xl">
                      Has delivered{" "}
                      <span className="text-8xl">{delivered}</span> boxes, but
                      something went wrong.<br></br>
                      <br></br>{" "}
                      <span className="text-2xl text-red-500">
                        You have been fired
                      </span>
                      .<br></br>
                      <br></br>
                      Have a nice day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-foreground">
              <button
                className="border text-white bg-background inline-flex w-full justify-center rounded-md px-3 py-2 shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModalGameComponent;
