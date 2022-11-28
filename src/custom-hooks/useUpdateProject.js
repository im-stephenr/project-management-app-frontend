import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useUpdateProject = () => {
  const [error, setError] = useState();
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateProject = async (data, pid) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.value,
          description: data.description.value,
          github: data.github.value,
          url: data.url.value,
        }),
        headers: {
          Authorization: `Bearer ${authData.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          navigate("/");
          setError("");
        })
        .catch((err) => {
          console.log(err);
          setError("UPDATE FAILED!");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { updateProject, error };
};
