import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../app/services/authServices.js";
import { setUserDetails } from "../app/store/slices/authSlice.js";
import { MdErrorOutline } from "react-icons/md";
import { Button, LoadingSpinner } from "./index";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Register = () => {
  const { handleSubmit, register, reset, formState } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading, isSuccess }] = useRegisterMutation();
  const submitForm = async (data) => {
    const response = await signup(data).unwrap();
    dispatch(
      setUserDetails({
        accessToken: response.accessToken,
        user: { email: data?.email },
      })
    );

    // reset();
    // navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full p-4">
      <div className="flex-1 flex items-center justify-center bg-white p-8 border">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-8 text-center">Register</h2>
          <form
            className="flex gap-3 flex-col"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col justify-center items-start w-full h-16">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={`${
                  formState.errors.name
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-slate-900"
                } w-full px-1 py-2 rounded border focus:outline-none shadow`}
                name="name"
                {...register("name", {
                  required: "The name feild is required.",
                })}
                aria-describedby="name-error"
              />
              {formState.errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
                >
                  <MdErrorOutline size={13} />
                  {formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center items-start w-full h-16">
              <input
                type="email"
                placeholder="Email"
                className={`${
                  formState.errors.email
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-slate-900"
                } w-full px-1 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-slate-900 shadow`}
                name="email"
                {...register("email", {
                  required: "The email feild is required.",
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
                name="password"
                className={`${
                  formState.errors.password
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-slate-900"
                } w-full px-1 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-slate-900 shadow`}
                {...register("password", {
                  required: "The password feild is required.",
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
            <div className="w-full h-16">
              <select
                className="w-full px-1 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-slate-900 mb-[1.1rem]"
                name="role"
                {...register("role")}
                required
              >
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR" disabled>
                  Vendor
                </option>
                <option value="ADMIN" disabled>
                  Admin
                </option>
              </select>
            </div>
            <Button
              type="submit"
              className={`${
                isSuccess &&
                "border-green-600 hover:border-green-600 text-green-600"
              } w-full`}
              buttonState={isLoading}
            >
              {isSuccess ? (
                <>
                  <span>Registered</span>
                  <IoIosCheckmarkCircle size={20} color="green" />
                </>
              ) : (
                <>
                  <span>Register</span>{" "}
                  {isLoading && <LoadingSpinner className="mt-[2px]" />}
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="mb-4">or register with</p>
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
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="mb-8">
            Join us today and explore amazing features tailored just for you.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition">
            Already have an account?{" "}
            <Link to={"/login"} className="hover:underline">
              Signin
            </Link>{" "}
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
