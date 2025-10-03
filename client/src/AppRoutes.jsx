import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Activation from "./components/Activation";
const AppRoutes = () => {
  const { decodedToken } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {decodedToken ? (
        <Routes>
          <Route path="/" element={< Dashboard />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-user/:token" element={<Activation />} />

        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
