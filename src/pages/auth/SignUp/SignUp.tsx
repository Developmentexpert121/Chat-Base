// Login.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../../services/slices/auth/signUp.tsx";
import toast from "react-hot-toast";
import { getEmail } from "../../../services/slices/auth/getEmail.tsx";
import { TextField } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch: any = useDispatch();

  const [email, setEmai] = useState("");

  useEffect(() => {
    dispatch(getEmail({ token: params?.token }))
      .unwrap()
      .then((response: any) => {
        setEmai(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.token]);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await dispatch(
      userSignUp({
        data: data,
        phone: phone,
        token: params.token,
        email: email,
      })
    )
      .unwrap()
      .then((response: any) => {
        if (response?.success === true) {
          toast.success("Account created successfully");
          navigate("/");
        } else {
          toast.error(response.message);
        }
      });
  };

  const [checked, setChecked] = React.useState(true);
  const [phone, setPhone] = useState<any>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div
        style={{ boxShadow: "0px 0px 10px #000" }}
        className="p-8 w-[500px] flex flex-col justify-between items-center cs-shadow rounded-lg bg-white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="heading-h2 font-bold mb-6 w-[400px] text-center">SignUp Here</h2>
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
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
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
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
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
                paddingTop: 8,
                paddingBottom: 8,
                width: "100%",
                border: 0,
                boxShadow: "none",
                color: "black",
                background: '#e5e7eb',
              }}
              containerStyle={{
                borderBottom: "1px solid #e5e7eb",
              }}
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
            {/* <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
            /> */}
            <TextField
              disabled
              value={email}
              variant="filled"
              className=" email-field mt-1 p-2 block w-full border-black border-b-1 hover:border-b-1 focus:outline-none focus:border-b-1 rounded-lg bg-gray-200"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )} */}
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
              className="btn-primary px-6 py-3 leading-tight mt-4"
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
            onClick={() => navigate("/")}
          >
            Log in!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
