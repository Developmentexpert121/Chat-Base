// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../../services/slices/auth/signUp.tsx";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
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

  console.log("errorserrors ", errors);

  const onSubmit = async (data: any) => {
    await dispatch(userSignUp({ data: data, phone: phone }))
      .unwrap()
      .then(
        (response: any) => response?.success === true && navigate("/login")
      );
  };

  const [checked, setChecked] = React.useState(true);
  const [phone, setPhone] = useState<any>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  console.log(phone);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div
        style={{ boxShadow: "0px 0px 10px #000" }}
        className="p-8 w-[500px] h-[700px] flex flex-col justify-between items-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-4xl font-bold mb-6 w-[400px]">SignUp Here</h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="mt-1 p-2 block w-full border-black border-b-2 hover:border-b-4 focus:outline-none focus:border-b-4"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="mt-1 p-2 block w-full border-black border-b-2 hover:border-b-4 focus:outline-none focus:border-b-4"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <PhoneInput
              country={"us"}
              enableSearch={true}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{
                paddingTop: 12,
                paddingBottom: 12,
                width: "100%",
                border: 0,
              }}
              containerStyle={{ borderBottom: "2px solid" }}
              inputProps={{
                id: "mobile",
                name: "mobile",
                required: true,
              }}
            />
            {phone.length === 0 && (
              <p className="text-red-500 text-sm mt-1">
                Phone number is required
              </p>
            )}
          </div>
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
          <div className="flex items-center gap-1 mb-4 mt-2">
            <Checkbox
              className="w-[28px] "
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />

            <div className="text-sm font-medium text-gray-700">
              I agree to all the statements in{" "}
            </div>
            <div
              className="text-sm font-medium hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Terms of service.
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-black text-white font-semibold px-4 py-2 rounded-md focus:bg-white hover:border-2 border-black focus:outline-none focus:text-black"
            >
              Sign-Up
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center gap-1">
          <div className="text-sm font-medium text-gray-700">
            Already have an account?{" "}
          </div>
          <div
            className="text-sm font-medium text-black hover:underline hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
