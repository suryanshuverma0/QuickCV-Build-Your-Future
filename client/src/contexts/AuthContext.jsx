import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authAPI } from "../api/apiService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUserDetails, setAuthenticatedUserDetails] =
    useState(null);

  const [decodedToken, setDecodedToken] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );

  const fetchData = useCallback(async () => {
    if (!decodedToken?.user?.id) {
      console.error("User ID not available.");
      return;
    }

    try {
      const response = await authAPI.fetchUser();
      setAuthenticatedUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [decodedToken]);

  const login = async (formData) => {
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem("token", response.data.token);
      setDecodedToken(jwtDecode(response.data.token));
      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/";
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Invalid credentials!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (error.response?.status === 403) {
        toast.error("Please activate your account first", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Login error:", error);
        toast.error("An error occurred during login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticatedUserDetails(null);
    setDecodedToken(null);

    toast.success("Logout Success!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  useEffect(() => {
    if (decodedToken) {
      fetchData();
    }
  }, [decodedToken, fetchData]);

  const context = {
    decodedToken,
    login,
    logout,
    authenticatedUserDetails,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
