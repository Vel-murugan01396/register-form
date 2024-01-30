import React from "react";

export default function Home() {
  return (
    <>
      <section
        className="md:flex md:w-full md:h-full md:p-0 h-full w-full p-5 "
        id="home1section"
      >
        <div className="bg-transparent hidden md:w-full md:block"></div>
        <div
          className=" md:w-full md:p-10 md:mt-0 rounded-xl  w-[100%] p-10 mt-40"
          id="div2home"
        >
          <div className="flex justify-center align-middle flex-col  h-full">
            <img
              src="/s1.png"
              alt="img1"
              className="w-[45%] ml-20  md:w-40 md:ml-48 "
            />
            <h1 className="md:ml-28 md:p-3 md:text-3xl font-semibold text-red-600  font-sans ml-20 p-3 text-xl ">
              Welcome To KVDGQA
            </h1>

            <p className="md:w-64 md:ml-40 md:p-3 text-base font-sans w-60 ml-9">
              If you have a specific service or platform in mind, please let me
              know, and I can provide more
            </p>
            <div className="md:ml-52 md:p-3 ml-20 p-3">
              <a href="http://localhost:3000/reg1">
                <button className="p-3 bg-teal-700 text-sm text-white rounded-md">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
