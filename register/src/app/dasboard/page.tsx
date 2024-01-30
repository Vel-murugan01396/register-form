"use client";
import React, { useEffect, useState } from "react";

export default function Dasboardpage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dataFromBackend, setDataFromBackend] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch("/api2"); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setDataFromBackend(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedTab === 0) {
      fetchDataFromBackend();
    }
  }, [selectedTab]);

  const tabData = [
    {
      title: "Tab 1",
      content: dataFromBackend || "Loading Tab 1 data...",
    },
    {
      title: "Tab 2",
      content: "Content for Tab 2",
    },
    {
      title: "Tab 3",
      content: "Content for Tab 3",
    },
  ];

  function renderContent(content) {
    if (typeof content === "string") {
      return <div>{content}</div>;
    } else if (typeof content === "object" && content !== null) {
      return (
        <div>
          <p>ID: {content.id}</p>
          <p>Username: {content.username}</p>
          <p>Password: {content.password}</p>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <>
      <section className="w-[100%] p-3 bg-yellow-400">
        <div className="bg-black w-full h-16">
          <button
            onClick={toggleSidebar}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Toggle Sidebar
          </button>
        </div>
        <div className="flex w-[100%] bg-brown-700 p-4 h-screen">
          <div
            className={`w-[30%] bg-deep-orange-400 ${
              isSidebarVisible ? "w-[10%]" : "w-[20%]"
            } transition-transform duration-500`}
          >
            <ul>
              {tabData.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedTab(index)}
                  className={`cursor-pointer ${
                    selectedTab === index ? "bg-gray-300" : ""
                  }`}
                >
                  {tab.title}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${
              isSidebarVisible ? "w-[90%]" : "w-[120%]"
            } bg-lime-700 transition-width duration-500`}
          >
            <div className="bg-gray-50 p-2 flex gap-8">
              <button className="bg-deep-orange-500 p-2 rounded-md text-sm text-blue-gray-50">
                copy
              </button>
              <button className="bg-deep-orange-500 p-2 rounded-md text-sm text-blue-gray-50">
                Download pdf
              </button>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-200 p-2 rounded-md text-sm text-blue-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div>{renderContent(tabData[selectedTab].content)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
