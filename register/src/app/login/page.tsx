"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { taskSchema, TaskSchema } from "../schema/form";

export default function Loginpage() {
  const [tasksFromDB, setTasksFromDB] = useState<TaskSchema[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    const { name, password } = data;

    const response = await fetch("/api2", {
      method: "POST",
      body: JSON.stringify({ name, password }),
    });
    if (response.ok) {
      const data = (await response.json()) as TaskSchema;
      setTasksFromDB([...tasksFromDB, data]);

      window.location.href = "http://localhost:3000/dasboard";
    }
    console.log(data);
  };

  return (
    <>
      <section className="background-image1 w-full h-screen flex items-center ">
        <div className="  w-[40%] h-[80%]  mx-auto bg-white rounded-md flex justify-center ">
          <div>
            <div className="w-full flex justify-center">
              <img src="/rth.png" alt="123" className="w-[30%] mt-2" />
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center p-4 text-xl font-semibold">
                  <h1>LOGIN REGISTER</h1>
                </div>
                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2 mx-3">USERID</label>
                  <br />
                  <input
                    placeholder="Enter Your User name"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-5 "
                    {...register("name")}
                  />
                </div>
                <div className="flex justify-center -ml-16">
                  {errors.name && (
                    <p className="text-deep-orange-400 text-xs">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-center p-2">
                  <label className="text-sm text-black p-2">PASSWORD</label>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-[300px] p-2 rounded-md border text-xs md:text-sm focus:outline-none mx-1"
                    {...register("password")}
                  />
                </div>
                <div className="flex justify-center -mr-20">
                  {errors.password && (
                    <p className="text-deep-orange-400  text-xs ">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex justify-center p-4 text-xl">
                  <button className="bg-deep-orange-400  text-sm text-gray-200 p-2 rounded-md px-7 py-2">
                    LOGIN
                  </button>
                </div>
                <div className="flex justify-center p-2 text-xl">
                  <h3 className="text-base text-deep-orange-400">
                    <a href="http://localhost:3000/signup">
                      Signup OR Register
                    </a>
                  </h3>
                </div>
                <div className="flex justify-center p-4 text-xl">
                  <h3 className="text-lg text-deep-orange-400">
                    <a href="#">Forget password ?</a>
                  </h3>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
