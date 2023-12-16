import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateModal from "./components/CreateModal";

function App() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Fetch settings on component mount
    fetch("http://localhost:3000/settings")
      .then((response) => response.json())
      .then((data) => setSettings(data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  return (
    <>
      <section className="bg-gray-900 w-full h-screen flex items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-center items-center py-1 px-1  mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-sm font-medium p-2 text-center">v1.0</span>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
            UKACHAR INVOICE
          </h1>

          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Klijent: {settings.company}
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              onClick={() => document.getElementById("my_modal_2").showModal()}
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Kreiraj ponudu
            </a>
          </div>
        </div>
      </section>
      <CreateModal />
    </>
  );
}

export default App;
