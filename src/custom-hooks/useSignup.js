import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signUp = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username.value);
    formData.append("fullName", data.fullName.value);
    formData.append("password", data.password.value);
    formData.append("email", data.email.value);
    formData.append("image", data.image.value);

    const responseData = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        console.log("response ", response);
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log("RETURNED DATA", data);
        if (!data.error) {
          dispatch({
            type: "LOGIN",
            payload: data,
          });
          localStorage.setItem("user", JSON.stringify(data)); // add token to local storage
          setError("");
          navigate("/");
        } else {
          // if signup failed
          setError(data.error.message);
        }
      });
  };

  return { signUp, error };
};
