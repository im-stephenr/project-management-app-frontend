import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const useLogin = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    const responseData = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (!data.error) {
          // If login ok
          console.log("RESPONSE DATA: ", data);
          dispatch({
            type: "LOGIN",
            payload: data,
          }); // dispatch from AuthContext
          localStorage.setItem("user", JSON.stringify(data)); // add token to local storage
          setError("");
          navigate("/");
        } else {
          console.log("ERROR LOGGING IN: ", data.error);
          dispatch({ type: "LOGOUT" }); // dispatch from AuthContext
          setError(data.error);
          localStorage.removeItem("user");
        }
      })
      .catch((error) => {
        console.log(error);
        // set loading false
      });
  };

  return { login, error };
};
