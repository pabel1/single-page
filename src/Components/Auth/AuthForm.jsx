import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/030---Paper-Stack.png";
import {
  useLoginUserMutation,
  useSignUpUserMutation,
} from "../../feature/auth/authApiSlice";
import Button from "./Button";
import Input from "./Input";
import PasswordLevelChecker from "./PasswordLevelChecker";

const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  linkText,
  link,
  linkTo,
  formType,
}) => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation() || {};
  const [signUpUser] = useSignUpUserMutation() || {};
  const [passwordLabel, setPasswordLabel] = useState("very weak");
  const handleForm = async (data) => {
    try {
      if (formType === "login") {
        const result = await loginUser({
          bodyData: data,
        });
        const { token } = result?.data || {};
        if (token) {
          navigate("/users");
          toast.success("login Success!");
        } else {
          toast.error(result?.error?.data?.error || "login failed!");
        }
      }
      if (formType === "signup") {
        const result = await signUpUser({
          bodyData: data,
        });

        const { token } = result?.data || {};
        if (token) {
          navigate("/users");
          toast.success("SignUp Success!");
        } else {
          toast.error(result?.error?.data?.error || "SignUp failed!");
        }
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
    }
  };
  useEffect(() => {
    const passwordLength = watch("password")?.length || 0;

    if (passwordLength < 3) {
      setPasswordLabel("very weak");
    } else if (passwordLength < 5) {
      setPasswordLabel("weak");
    } else if (passwordLength < 6) {
      setPasswordLabel("medium");
    } else if (passwordLength < 8) {
      setPasswordLabel("strong");
    } else {
      setPasswordLabel("very strong");
    }
  }, [watch("password")]);
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <div className="w-[400px] border p-10 rounded-lg shadow-md">
        <div className="">
          <div className="flex gap-1 items-center">
            <img className="h-6 w-10" src={logo} alt="logo" />
            <h2 className="font-bold text-2xl text-[#4E5D78]">Stack</h2>
          </div>
          <p className="mt-4 font-semibold">{title}</p>
        </div>
        <form
          className="form mt-10 grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="">
            <label htmlFor="email" className="text text-base my-4 font-medium">
              Email
            </label>

            <Input
              type="text"
              placeholder="Enter Email"
              error={errors?.email}
              customClassName="py-2 px-3 focus:ring-purple-200 focus:border-purple-400"
              hookRef={{ ...register("email", { required: true }) }}
            />
            {errors?.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mt-3">
            <label
              htmlFor="password"
              className="text text-base my-4 font-medium "
            >
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter Password"
              error={errors?.password}
              customClassName="py-2 px-3 focus:ring-purple-200 focus:border-purple-400"
              hookRef={{ ...register("password", { required: true }) }}
            />

            {errors?.password && (
              <p className="text-[10px] text-red-500 -mt-2">
                {errors.password.message}
              </p>
            )}
            {/* password level tracking */}
            {formType === "signup" && watch("password") && (
              <PasswordLevelChecker passwordLabel={passwordLabel} />
            )}
          </div>

          <div className="">
            <Button
              type="submit"
              customClass="bg-purple-600 text-white rounded-lg p-2 w-full"
              text={buttonText}
            />
            <p className="mt-3 text-gray-400 px-1">
              {linkText}{" "}
              <Link to={link} className="text-[#377DFF]">
                {linkTo}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
