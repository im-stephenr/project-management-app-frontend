import React, { useContext } from "react";
import { parsePath } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const useGetProjects = () => {
  const { authData } = useContext(AuthContext);
  let projects;

  const getProjects = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
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
          projects = data;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { getProjects, projects };
};
