import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../components/Button";
const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formData = { usernameOrEmail, password };
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center w-full min-h-screen items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white md:w-96 lg:w-96 w-80 shadow-lg rounded-lg"
        >
          <h1 className="font-bold text-3xl text-center text-gray-900">
            Login
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="usernameOrEmail"
              className="text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold"
              placeholder="Enter your username or email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold w-full"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
              Forgot Password?
            </Link>
          </div>

          {/* <button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 ${
              isLoading ? "bg-white cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            Login
          </button> */}

          <Button text="Login" type="submit" variant="black" isLoading={isLoading} />


          <Link to={"/signup"}>
            <div className="flex justify-center">
              <p>
                Don&apos;t Have An Account?{" "}
                <span className="text-sm text-gray-600 hover:text-gray-800">
                  Signup
                </span>
              </p>
            </div>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
