import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetUserInfoQuery,
  useLoginMutation,
} from "../app/services/authServices.js";
import { setUserDetails } from "../app/store/slices/authSlice.js";
import { MdErrorOutline } from "react-icons/md";
import { Button, LoadingSpinner } from "./index.js";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Login = () => {
  const { register, handleSubmit, reset, formState, setError } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const { refetch: refetchUserInfo } = useGetUserInfoQuery();
  const submitForm = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(
        setUserDetails({
          accessToken: response.accessToken,
          user: { email: data.email },
        })
      );
      await refetchUserInfo();
      reset();
      navigate("/", { replace: true });
    } catch (error) {
      if (error && error.status === 404) {
        setError("email", {
          type: "manual",
          message: error.data.message || "Invalid credentials",
        });

        setError("password", {
          type: "manual",
          message: error.data.message || "Invalid credentials",
        });
      } else {
        alert("Something went wrong, please try again later.");
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen w-full p-4">
      <div className="flex-1 flex items-center justify-center bg-white border">
        <div className="w-full max-w-md shadow-lg p-8 border rounded-md">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Login to Continue
          </h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col justify-center items-start w-full h-16">
              <input
                type="email"
                placeholder="Email or Username"
                className={`${
                  formState.errors.email
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-slate-900"
                } w-full px-1 py-2 border rounded focus:outline-none shadow`}
                name="email"
                {...register("email", {
                  required: "This feild is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Emails should be formatted as: name@example.com",
                  },
                })}
                aria-describedby="email-error"
              />

              {formState.errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
                >
                  <MdErrorOutline size={13} />
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center items-start w-full h-16">
              <input
                type="password"
                placeholder="Password"
                className={`${
                  formState.errors.password
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-slate-900"
                } w-full px-1 py-2 border rounded focus:outline-none shadow`}
                {...register("password", {
                  required: "This feild is required.",
                  maxLength: {
                    value: 15,
                    message: "password should not greater then 15 characters",
                  },
                  minLength: {
                    value: 8,
                    message: "password should not less then 8 characters",
                  },
                })}
                aria-describedby="password-error"
              />

              {formState.errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
                >
                  <MdErrorOutline size={13} />
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className={`w-full ${
                isSuccess &&
                "border-green-600 hover:border-green-600 text-green-600"
              }`}
              buttonState={isLoading}
            >
              {isSuccess ? (
                <>
                  <span>LoggedIn</span>
                  <IoIosCheckmarkCircle size={20} color="green" />
                </>
              ) : (
                <>
                  <span>Login</span>{" "}
                  {isLoading && <LoadingSpinner className="mt-[2px]" />}
                </>
              )}
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="mb-4">or sign in with</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 p-3 rounded-full text-white">
                f
              </button>
              <button className="bg-red-500 p-3 rounded-full text-white">
                G+
              </button>
              <button className="bg-blue-700 p-3 rounded-full text-white">
                in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-8">
        <div className="text-white text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
          <p className="mb-8">
            We're happy to see you again. We hope you had a safe and enjoyable
            time away.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition">
            No account yet?{" "}
            <Link to={"/register"} className="hover:underline">
              {" "}
              Register.
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
