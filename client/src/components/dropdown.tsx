import { useState } from "react";
import React from "react";

interface DropdownProps {
  title?: string;
  children: { title: string; path: string }[];
  lastItem: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children, lastItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <li onClick={() => setOpen(false)} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full lg:w-auto lg:px-3 py-2 text-gray-600 hover:text-gray-900"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className={`w-3 h-3 mt-0.5 ${open ? "rotate-180" : "rotate-0"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </button>
      <div
        style={{ display: open ? "block" : "none" }}
        className={`lg:absolute w-full lg:w-48 ${
          lastItem ? "lg:right-0 origin-top-right" : "lg:left-0 origin-top-left"
        }`}
      >
        <div className="px-3 lg:py-2 lg:bg-white lg:rounded-md lg:shadow lg:border flex flex-col">
          {Array.isArray(children) &&
            children.map(
              (item: { path: string; title: string }, index: number) => (
                <a
                  key={index}
                  href={item.path}
                  className="py-1 text-gray-600 hover:text-gray-900"
                >
                  {item.title}
                </a>
              )
            )}
        </div>
      </div>
    </li>
  );
};
export default Dropdown;
