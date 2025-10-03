import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordAPI } from "../api/apiService";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = window.location.pathname.split("/reset-password/")[1];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // API call for updating password
      const response = await passwordAPI.resetPassword(token, password);
      const data = response.data;
      console.log("Response:", data);
      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log("Password updated:", password);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.error || "Something went wrong. Try again.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="flex justify-center w-full min-h-screen items-center bg-gray-100">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white md:w-96 lg:w-96 w-80 shadow-lg rounded-lg"
        >
          {" "}
          <h1 className="font-bold text-3xl text-center text-gray-900">
            Forgot Password{" "}
          </h1>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold w-full"
                placeholder="Enter new password"
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold w-full"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 ${
              isLoading ? "bg-white cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            Update Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
