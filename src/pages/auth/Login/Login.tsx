// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../services/slices/auth/login.tsx";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(userLogin(data))
      .unwrap()
      .then((response: any) => {
        if (response.isRestricted === true) {
          toast.error("You are restricted to enter the site");
        } else {
          response.success === true && navigate("/dashboard");
          window.location.reload();
        }
      });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div
        className="p-8 w-[500px] h-[410px] flex flex-col justify-between items-center"
        style={{ boxShadow: "0px 0px 10px #000" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-4xl font-bold mb-6 w-[400px]">Login Here</h2>

          <div className="mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 p-2 block w-full border-black border-b-2 hover:border-b-4 focus:outline-none focus:border-b-4"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div
            className="text-sm font-medium text-black hover:underline hover:cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-black text-white font-semibold px-4 py-2 mt-4 rounded-md focus:bg-white hover:border-2 border-black focus:outline-none focus:text-black"
            >
              Login
            </button>
          </div>
        </form>
        {/* <div className="mt-6 flex items-center gap-1">
          <div className="text-sm font-medium text-gray-700 ">
            Don't have an account?{" "}
          </div>
          <div
            className="text-sm font-medium text-black hover:underline hover:cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            Sign-Up!
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
