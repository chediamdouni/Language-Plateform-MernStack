import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";

const LoginMethods = () => {
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
          <div className="font-korto font-sans text-4xl my-8">
            {" "}
            Login Methods{" "}
          </div>
          <div className="space-y-4 divide-y ">
            <div className="block mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="126.445 2.281 589 589"
                id="facebook"
                className="my-5"
              >
                <circle
                  cx="420.945"
                  cy="296.781"
                  r="294.5"
                  fill="#3c5a9a"
                ></circle>
                <path
                  fill="#fff"
                  d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
                ></path>
              </svg>
              <div className="flex justify-between">
                <div className="font-semibold font-korto font-sans text-2xl ">
                  Facebook
                </div>
                <button>CONNECT</button>
              </div>
            </div>
            <div className="block mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
                className="my-5"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              <div className="flex justify-between">
                <div className="font-semibold font-korto font-sans text-2xl ">
                  Google
                </div>
                <button>CONNECT</button>
              </div>
            </div>
            <div className="block mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                id="apple"
                className="my-5"
              >
                <path d="M40.628 11.048c2.024-2.611 3.558-6.304 3.003-10.073-3.309.23-7.173 2.346-9.429 5.104-2.057 2.5-3.747 6.216-3.086 9.826 3.616.113 7.348-2.054 9.512-4.857z"></path>
                <path
                  fill="#1B546B"
                  d="M56.705 21.793c-3.175-3.984-7.64-6.293-11.856-6.293-5.564 0-7.919 2.664-11.783 2.664-3.987 0-7.015-2.656-11.828-2.656-4.729 0-9.764 2.89-12.955 7.83-4.486 6.959-3.721 20.037 3.554 31.179 2.601 3.988 6.074 8.468 10.619 8.509 4.045.04 5.186-2.594 10.667-2.624 5.479-.032 6.52 2.658 10.557 2.612 4.548-.036 8.214-5.002 10.814-8.99 1.864-2.856 2.56-4.297 4.007-7.523-10.524-4.003-12.211-18.965-1.796-24.708z"
                ></path>
                <path d="M50.322 29.485c-7.954 6.44-19.199 10.464-31.68 10.464-4.472 0-8.786-.518-12.846-1.476.687 5.226 2.645 10.842 6.042 16.043 2.601 3.988 6.074 8.468 10.619 8.509 4.045.04 5.186-2.594 10.667-2.624 5.479-.032 6.52 2.658 10.557 2.612 4.548-.036 8.214-5.002 10.814-8.99 1.864-2.856 2.56-4.297 4.007-7.523-7.156-2.72-10.22-10.503-8.18-17.015z"></path>
              </svg>
              <div className="flex justify-between">
                <div className="font-semibold font-korto font-sans text-2xl ">
                  Apple
                </div>
                <button>CONNECT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};
export default LoginMethods;
