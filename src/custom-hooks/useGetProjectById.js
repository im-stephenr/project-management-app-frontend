import React, { useContext } from "react";
import { parsePath } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const useGetProjectById = () => {
  const { authData } = useContext(AuthContext);
  let project;

  const getProject = async (pid) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authData.token}` },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          project = data;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { getProject, project };
};
