import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../services/slices/auth/forgot-password.tsx";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(forgotPassword(data))
      .unwrap()
      .then((response: any) => {
        if (response.success === true) {
          setEmailSent(true);
        }
      });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {emailSent !== true ? (
        <div className="p-8 w-[500px] h-[320px] flex flex-col justify-between items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-4xl font-bold mb-4 w-[400px]">
              Reset Password
            </h2>
            <div className="text-sm font-medium text-gray-700">
              Enter your email where you will recieve a mail to reset your
              password.
            </div>
            <div className="mb-4 mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="mt-1 p-2 block w-full border-black border-b-2 hover:border-b-4 focus:outline-none focus:border-b-4"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-black text-white font-semibold px-4 py-2 mt-4 rounded-md focus:bg-white hover:border-2 border-black focus:outline-none focus:text-black"
              >
                Send Mail
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center gap-1">
            <div className="text-sm font-medium text-gray-700 ">
              Remember your password?{" "}
            </div>
            <div
              className="text-sm font-medium text-black hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login!
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8  flex flex-col justify-between items-center">
          <h2 className="text-4xl font-bold mb-4 w-[800px] text-center">
            A mail has been successfuly sent to your email which will help you
            to reset your password!
          </h2>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
