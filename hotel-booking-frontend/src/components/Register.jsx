import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../app/services/authServices.js";
import { setUserDetails } from "../app/store/slices/authSlice.js";

const Register = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useRegisterMutation();
  const submitForm = async (data) => {
    const response = await signup(data).unwrap();
    dispatch(
      setUserDetails({
        accessToken: response.accessToken,
        user: { email: data?.email },
      })
    );
    reset();
    navigate("/");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen w-full p-4">
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-8 text-center">Register</h2>
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
              name="name"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
              name="email"
              {...register("email")}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
              {...register("password")}
              required
            />
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="role"
              {...register("role")}
              required
            >
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="ADMIN" disabled>
                Admin
              </option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              Register
            </button>
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
