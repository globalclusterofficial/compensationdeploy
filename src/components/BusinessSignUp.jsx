import React, { useState } from "react";

import LoginPageImg from "./../assets/images/loginPageSideImg.jpeg";
import BusinessSignUpForm from "./BusinessSignUpForm";
import LoginHeader from "./LoginHeader";

function BusinessSignUp() {
  const [companySizeInputShow, SetCompanySizeInputShow] = useState(true);
  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      <div className="flex flex-1 justify-between ">
        <div className="w-full flex flex-col p-8 ">
          <div className="flex-grow flex flex-col  justify-center items-center">
            <div className="mt-20 md:w-[50%] w-[100%] flex flex-col gap-2">
              <h2
                className={`text-4xl font-semibold mb-6 ml-6 ${
                  companySizeInputShow === true ? null : "hidden"
                }`}
              >
                Get Started with The Global Clusters as a Vendor
              </h2>
              <BusinessSignUpForm
                companySizeInput={companySizeInputShow}
                SetCompanySizeInput={SetCompanySizeInputShow}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-8/12 relative">
          <div className="absolute inset-0 bg-gradient-to-b  from-gray-500 to-gray-600 opacity-70"></div>
          <img
            className="w-full h-full object-center object-cover"
            src={LoginPageImg}
            alt="Login Page Earth with gradient Img"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessSignUp;
