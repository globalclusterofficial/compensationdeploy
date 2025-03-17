import React, { useState } from "react";
import Header from "../../components/ui/Header";
import ContactInformationStep2 from "./../../components/ContactInformationStep2";
import LoginInformationStep3 from "./../../components/LoginInformationStep3";
import OverviewStep4 from "./../../components/OverviewStep4";
import RegisterNowStep1 from "./../../components/RegisterNowStep1";
import { useUser } from "../../hooks/auth/useUser";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const { user } = useUser();
  const [hasErrors, setHasErrors] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [position, setPosition] = useState("left");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    getValues,
  } = useForm();

  const [regForm, setRegForm] = useState(1);
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  let sponsor, sponsor_id;
  switch (user?.user_type) {
    case "individual":
      sponsor = user?.user;
      sponsor_id = user?.user_id;
      break;
    case "company":
      sponsor = user?.name;
      sponsor_id = user?.user_id;
      break;
    default:
      sponsor = "Admin";
  }
  const onSubmit = async (data) => {
    try {
      const responseData = await signup({
        ...data,
        name: data.first_name + " " + data.last_name,
        user_type: "individual",
        sponsor: sponsor,
        sponsor_id: sponsor_id,
        membership_package: "membership_package",
        price: "1000",
        position,
      }).unwrap();

      NextFormPage();
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleNextButtonClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      NextFormPage();
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  function PreviousFormPage() {
    if (regForm === 1) return;
    setRegForm(regForm - 1);
  }

  function NextFormPage() {
    setRegForm(regForm + 1);

    if (regForm === 4) {
      navigate("/user/registrations");
    }
  }
  return (
    <div className=" bg-gray-50 ">
      <Header />
      <div className="bg-white m-10  border rounded-xl text-[60%] lg:text-[100%]">
        <div className="bg-gray-50  m-10 rounded-xl ">
          <div className="  my-10 flex lg:gap-10 lg:p-10  items-center">
            <div className="flex flex-col gap-2 items-center justify-center">
              <p className="bg-primary-light text-white px-6 py-2">1</p>
              <p className="font-thin">Register Now</p>
            </div>
            <div className="border-b border-dashed border-primary-light w-[8rem]" />
            <div className="flex flex-col gap-2 items-center justify-center">
              <p
                className={`${
                  regForm > 1 ? "bg-primary-light" : "bg-slate-400"
                } text-white px-6 py-2`}
              >
                2
              </p>
              <p className="font-thin ">Contact Information</p>
            </div>
            <div className="border-b border-dashed border-primary-light w-[8rem]" />
            <div className="flex flex-col gap-2 items-center justify-center">
              <p
                className={`${
                  regForm > 2 ? "bg-primary-light" : "bg-slate-400"
                } text-white px-6 py-2`}
              >
                3
              </p>
              <p className="font-thin">Login Information</p>
            </div>
            <div className="border-b border-dashed border-primary-light w-[8rem]" />
            <div className="flex flex-col gap-2 items-center justify-center">
              <p
                className={`${
                  regForm > 3 ? "bg-primary-light" : "bg-slate-400"
                } text-white px-6 py-2`}
              >
                4
              </p>
              <p className="font-thin">Overview</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-6/6 mx-auto">
            {regForm === 1 && (
              <RegisterNowStep1 position={position} setPosition={setPosition} />
            )}
            {regForm === 2 && (
              <ContactInformationStep2 register={register} errors={errors} />
            )}
            {regForm === 3 && (
              <LoginInformationStep3
                register={register}
                errors={errors}
                watch={watch}
              />
            )}
            {regForm === 4 && <OverviewStep4 getValues={getValues} />}

            <div className="w-2/2 lg:w-1/2 text-center items-center justify-center flex gap-8 text-white mx-auto py-20">
              <p
                className="px-10 lg:px-20 flex-1 py-4 bg-gray-500 rounded-lg cursor-pointer select-none"
                onClick={PreviousFormPage}
              >
                Back
              </p>

              {regForm === 4 ? (
                <>
                  {hasErrors && (
                    <p className="text-red-500 text-center py-4">
                      There are errors in the form. Please correct them before
                      submitting.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="buttonx-20 flex-1 w-full py-4 bg-primary-light rounded-lg cursor-pointer select-none"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <p
                  className="px-10 lg:px-20 flex-1 py-4 w-full bg-primary-light rounded-lg cursor-pointer select-none"
                  onClick={handleNextButtonClick}
                >
                  Next
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
