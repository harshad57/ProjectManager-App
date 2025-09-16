import React from "react";

const Menu = ({ setopen, open }) => {
  return (
    <button
      aria-label="Toggle Menu"
      onClick={() => setopen(!open)}
      className="flex flex-col gap-2 w-7 z-70 relative border-none outline-none focus:outline-none active:border-0"
    >
      {/* Top bar */}
      <div
        className={`rounded-2xl h-[3px] w-1/2 bg-black duration-500 ${
          open
            ? "rotate-[225deg] origin-right -translate-x-[11px]"
            : ""
        }`}
      />
      {/* Middle bar */}
      <div
        className={`rounded-2xl h-[3px] w-full bg-black duration-500 ${
          open ? "-rotate-45" : ""
        }`}
      />
      {/* Bottom bar */}
      <div
        className={`rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end ${
          open
            ? "rotate-[225deg] origin-left translate-x-[11px]"
            : ""
        }`}
      />
    </button>
  );
};

export default Menu;
