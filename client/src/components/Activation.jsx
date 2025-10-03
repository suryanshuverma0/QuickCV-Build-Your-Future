import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { userVerificationAPI } from "../api/apiService";

const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await userVerificationAPI.verifyUser(token);
        console.log("Verification response:", response.data);

        setStatus("success");
        setMessage(response.data.message || "Your account has been activated!");
        setAlreadyVerified(response.data.alreadyVerified || false);
      } catch (error) {
        console.error("Verification error:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error === "Invalid or expired activation link"
        ) {
          // Instead of error, treat as "already verified"
          setStatus("success");
          setAlreadyVerified(true);
          setMessage("Your account is already activated.");
        } else {
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
        }
      }
    };

    verifyUser();
  }, [token]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Verifying your account...</p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="flex flex-col items-center text-center">
          {alreadyVerified ? (
            <Info className="h-16 w-16 text-blue-500 mb-4" />
          ) : (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          )}

          <h2
            className={`text-2xl font-bold mb-2 ${
              alreadyVerified ? "text-blue-600" : "text-green-600"
            }`}
          >
            {message}
          </h2>

          <p className="text-gray-500 mb-6">
            {alreadyVerified
              ? "You can log in with your account now."
              : "Your account is ready to use."}
          </p>

          <button
            onClick={() => navigate("/")}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              alreadyVerified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {alreadyVerified ? "Proceed to Login" : "Go to Login"}
          </button>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">{message}</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Back to Home
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default Activation;
