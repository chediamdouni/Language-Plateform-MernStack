import { Breadcrumbs, Option, Select } from "@material-tailwind/react";
import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";

const Settings = () => {
  return (
    <TuteurLayout>
      <div className="max-w-5xl h-screen mx-auto p-8 ">
        <div className="flex flex-col">
          <Breadcrumbs>
            <a href="/#" className="opacity-60">
              Tuteur
            </a>
            <a href="/#" className="opacity-60">
              Account Settings
            </a>
            <a href="/#">Login Methods</a>
          </Breadcrumbs>
          <div className="font-korto font-sans text-4xl my-8"> Settings </div>
          <div className="space-y-4 divide-y ">
            <div className="p-2">
              <div className="flex gap-8 my-8">
                <label
                  htmlFor="default"
                  className="block mb-2 w-64 text-sm font-medium font-korto font-sans text-gray-900 dark:text-white text-xl "
                >
                  Language
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="p-2">
              <div className="flex gap-8 my-8">
                <label
                  htmlFor="default"
                  className="block mb-2 w-64 text-sm font-medium font-korto font-sans text-gray-900 dark:text-white text-xl "
                >
                  Current Location
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="p-2">
              <div className="flex gap-8 my-8">
                <label
                  htmlFor="default"
                  className="block mb-2 w-64 text-sm font-medium font-korto font-sans text-gray-900 dark:text-white text-xl "
                >
                  Current Location Timezone
                </label>
                <div className="font-korto font-meduim font-sans ">
                  Africa/Tunis
                </div>
              </div>
            </div>
            <div className="py-8">
              <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-24"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};
export default Settings;
