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

  const onSubmit:any = (data: any) => {
    console.log("datadatadata ", data)
    dispatch(userLogin(data)).unwrap().then((response: any) => {
        console.log("2222222222222222222222 ", response);
        localStorage?.setItem("token", response.data.token);
        localStorage.setItem("chatbotId", response.data.user.chatbotId);
        if (response?.isRestricted === true) {
          toast.error("You are restricted to enter the site");
        } else {
          (response?.success === true && response?.isAdmin === 1)
            ? navigate("/admin/dashboard")
            : navigate("/dashboard");
          // window.location.reload();
        }
      });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div
        className="p-8 w-[500px] flex flex-col justify-between items-center cs-shadow rounded-lg bg-white"
        style={{ boxShadow: "0px 0px 10px #000" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="heading-h2 font-bold mb-6 w-[400px] text-center">Login Here</h2>

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
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
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
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div
            className="text-sm font-medium text-black hover:underline hover:cursor-pointer text-end"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn-primary px-6 py-3 leading-tight mt-4"
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
