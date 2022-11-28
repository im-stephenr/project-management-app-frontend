import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAddProject = () => {
  const [error, setError] = useState();
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  const addProject = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title.value);
    formData.append("description", data.description.value);
    formData.append("github", data.github.value);
    formData.append("url", data.url.value);
    // UPLOADING MULTIPLE FILES iterate the files and append it formData
    if (data.files) {
      for (let i = 0; i < data.files.value.length; i++) {
        formData.append("files", data.files.value[i]);
      }
    }

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${authData.token}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (data) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return { addProject, error };
};
