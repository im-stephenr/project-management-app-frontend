import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    // remove context states
    dispatch({ type: "LOGOUT" });
    // remove local storage
    localStorage.removeItem("user");

    navigate("/login");
  };

  return { logout };
};
