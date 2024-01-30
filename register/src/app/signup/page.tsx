"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "./form";

export default function Signuppage() {
  const [tasksFromDB, setTasksFromDB] = useState<TaskSchema[]>([]);
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [submittedPassword, setSubmittedPassword] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    const { name, email, password } = data;

    const isNameExists = tasksFromDB.some((task) => task.name === name);
    const isEmailExists = tasksFromDB.some((task) => task.email === email);

    if (isNameExists || isEmailExists) {
      // Show an error message if the name or email already exists
      alert("Name or Email already exists. Please choose a different one.");
    } else {
      const response = await fetch("/api1", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const data = (await response.json()) as TaskSchema;
        setTasksFromDB([...tasksFromDB, data]);
        setSubmittedName(name); // Store the submitted name
        setSubmittedPassword(password); // Store the submitted password
        setShowSuccessPopup(true);
      }
    }
    console.log(data);
  };

  return (
    <>
      <section className="bg-black w-full h-screen flex items-center ">
        <div className="  w-full  flex ">
          <div className="w-full h-screen background-image"></div>
          <div className="w-full h-screen bg-light-blue-500 flex  flex-col">
            <div className="w-[100%] flex justify-center mt-8">
              <img src="/rth.png" alt="123" className="w-[30%]" />
            </div>
            <div className="flex justify-center w-full">
              <form className="w-[100%]  " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center p-4 text-xl font-semibold text-white">
                  <h1>CREAT A FREE ACCOUNT NOW</h1>
                </div>
                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2">Name</label>
                  <br />
                  <input
                    placeholder="Enter Your Name"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-14"
                    {...register("name")}
                  />
                </div>
                <div className=" flex justify-center -ml-14">
                  {errors.name && (
                    <p className="text-deep-orange-400 text-xs ">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2">Email</label>
                  <br />
                  <input
                    placeholder="Enter Your email"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-14 "
                    {...register("email")}
                  />
                </div>
                <div className="flex justify-center ml-20">
                  {errors.email && (
                    <p className="text-deep-orange-400 text-xs">
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2 -mx-5">
                    PASSWORD
                  </label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-8 "
                    {...register("password")}
                  />
                </div>
                <div className="flex justify-center ml-20">
                  {errors.password && (
                    <p className="text-deep-orange-400  text-xs ">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex justify-center p-4 text-xl">
                  <button className="bg-deep-orange-400 text-sm text-gray-200 p-2 rounded-md px-7 py-2">
                    CREAT ACCOUNT
                  </button>
                </div>
                <div className="flex justify-center p-4 text-xl">
                  <h3 className="text-lg text-white">
                    <a href="http://localhost:3000/login">
                      Allready Have Account !!
                    </a>
                  </h3>
                </div>
                <div className="flex justify-center p-4 mt-7">
                  <h5 className="text-sm text-white ">
                    Copyright @2023 Rthinfotech
                  </h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-start justify-start z-50 m-2">
          <div className="bg-deep-orange-400 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Success!</h2>
            <p>Your account has been created successfully.</p>
            <p>Name: {submittedName}</p>
            <p>Password: {submittedPassword}</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
