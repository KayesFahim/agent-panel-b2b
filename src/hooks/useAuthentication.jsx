import { useState } from "react";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;

const useAuthentication = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = async (loginData) => {
    setIsLoading(true);
    setError(""); // Clear any previous error messages

    try {
      secureLocalStorage.setItem("state", loginData);

      const body = JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      });

      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.status);
      }

      const data = await response.json();

      secureLocalStorage.setItem("user-info", data);
      navigate("/agent/dashboard");
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // 
      secureLocalStorage.removeItem("user-info");
      secureLocalStorage.removeItem("commissionData");
      secureLocalStorage.removeItem("state");
    } catch (error) {
      console.error("Error during logout: ", error);
    } finally {
      navigate("/signin");
    }
  };
  return {
    loginUser,
    logout,
    isLoading,
    error,
  };
};

export default useAuthentication;
