import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useDeleteProject = () => {
  const { authData } = useContext(AuthContext);

  const deleteProject = async (pid) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { deleteProject };
};
