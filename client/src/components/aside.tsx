import React from "react";

const Aside = () => {
  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                <span className="ms-3 text-2xl">Become a Tutor </span>
              </div>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="/tuteur/step/welcome"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <span className="ms-3 text-xl">Welcome to Our Learn Up!</span>
              </a>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="/tuteur/step/signup-checklist"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <span className="ms-3 text-xl">Signup Checklist</span>
              </a>
              <div className="flex flex-col mt-4 ml-4 font-korto font-sans font-base text-xl space-y-8">
                
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Aside;
