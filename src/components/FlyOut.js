"use client";

import { useState, useRef, createContext, useContext } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import IconButton from "@/components/IconButton";
import { useClickOutside } from "@/hooks";

const FlyOutContext = createContext({
  open: false,
  toggle: () => {},
});

function FlyOut({ children, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  function toggle(event) {
    event.stopPropagation();
    setOpen((value) => !value);
  }

  useClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div className={`relative ${className}`} ref={ref}>
      <FlyOutContext.Provider value={{ open, toggle }}>
        {children}
      </FlyOutContext.Provider>
    </div>
  );
}

function Toggle() {
  const { toggle } = useContext(FlyOutContext);

  return (
    <IconButton className="cursor-pointer rounded-full" onClick={toggle}>
      <EllipsisVerticalIcon className="size-6" />
    </IconButton>
  );
}

function List({ children }) {
  const { open } = useContext(FlyOutContext);

  return open ? (
    <ul className="absolute right-0 z-10 rounded border border-[#444] bg-[#20212c] py-2 text-[#828fa3]">
      {children}
    </ul>
  ) : null;
}

function Item({ children, onClick }) {
  const { toggle } = useContext(FlyOutContext);

  async function onClickHandler(event) {
    onClick();
    toggle(event);
  }

  return (
    <li
      className="cursor-pointer px-4 py-1 text-nowrap hover:bg-[#2b2c37]"
      onClick={onClickHandler}
    >
      {children}
    </li>
  );
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

export default FlyOut;
