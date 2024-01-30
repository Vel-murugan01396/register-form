import React from "react";

export default function maintancepage() {
  return (
    <>
      <section className="w-full h-full bg-white flex p-5">
        {/* <div className="w-full h-full flex justify-center items-center ">
          <div className="w-[80%] h-[80%] border-4 ">
            <img src="/main.png" alt="qwe" className="ml-14" />
            <h1 className="text-2xl text-white ml-16 p-5">
              Innovative Maintenance Page
              <br />
              Examples and Best Practices
            </h1>
          </div>
        </div>
        <div className="w-full h-full flex justify-start items-center">
          <img src="/m2.jpeg" alt="" />
        </div> */}
        <div className="w-full h-full flex-col flex justify-center items-center">
          <div>
            <img src="/mm1.png" alt="123" className="mt-10" />
          </div>
          <div className="w-full h-full flex-col flex justify-center items-center">
            <h1 className="text-4xl text-black">Website under maintenance</h1>
            <br />
            <h2 className="text-base text-black">
              This website is currently undergoing scheduled maintenance. We
              should be back soon on
              <samp className="text-base text-blue-800">"22.09.2023"</samp>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
