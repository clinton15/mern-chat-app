import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async (formObj) => {
    const success = handleInputErrors(formObj);
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formObj }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-app", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  } else if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  } else if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  } else {
    return true;
  }
};
