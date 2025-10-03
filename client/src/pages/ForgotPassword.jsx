import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordAPI } from "../api/apiService";
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      // API call for sending reset link
      console.log("Reset link sent to:", email);
      const response = await passwordAPI.forgotPassword(email);
      console.log("Response:", response.data);
      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
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
            Reset Password{" "}
          </h1>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 font-semibold"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* <button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 ${
              isLoading ? "bg-white cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            Send Reset Link
          </button> */}

          <Button text="Send Reset Link" type="submit" variant="black" isLoading={isLoading} />

        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
