"use client";

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dasboardpage from "./dasboard/page";
import Loginpage from "./login/page";

export default function Home() {
  return (
    <>
      <div>
        {/* <BrowserRouter>
          <Route path="/login" Component={Loginpage} />
          <Route path="/dasboard" Component={Dasboardpage} />
        </BrowserRouter> */}
      </div>
    </>
  );
}
