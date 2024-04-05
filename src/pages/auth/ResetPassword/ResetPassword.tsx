import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../services/slices/auth/reset-password.tsx";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (data.password === data.confirmPassword) {
      const newData = {
        password: data.password,
        token: params.token,
      };
      dispatch(resetPassword(newData))
        .unwrap()
        .then((response: any) => {
          if (response.success === true) {
            toast.success("Password updated successfully");
            navigate("/login");
          }
        });
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div className="p-8 w-[500px] flex flex-col justify-between items-center cs-shadow rounded-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="heading-h2 font-bold mb-6 w-[400px] text-center">Reset Password</h2>
          <div className=" font-medium text-gray-700">
            Enter your new password
          </div>
          <div className="mb-4 mt-4">
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
          <div className="mb-4 mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn-primary px-6 py-3 leading-tight mt-4"
            >
              Reset Password
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
    </div>
  );
};

export default ResetPassword;
