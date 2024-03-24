import React from "react";
import FormPage from "./FormPage";

function LoginPage() {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 place-items-center max-h-[100%] min-h-screen bg-dimWhite">
      <img
        src="./assets/bg-twitter.jpg"
        alt="background-twitter"
        className=" object-cover h-[100%] max-md:hidden"
      />

      <div className="px-8 py-16">
        <div className="space-y-8 mb-8 ">
          <img
            src="./assets/logo-twitter.png"
            className="w-[40px] "
            alt="logo-twitter"
          />
          <h2 className="text-5xl font-bold">Happening Now</h2>
          <p className="text-2xl">Join Twitter today.</p>
        </div>

        <FormPage />
      </div>
    </div>
  );
}

export default LoginPage;
