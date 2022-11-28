import React, { useContext, useEffect, useState } from "react";
import HeaderContainer from "../../shared/components/HeaderContainer";
import ProjectItem from "../components/ProjectItem";
import AlertWarning from "../../shared/components/AlertWarning";
import { AuthContext } from "../../context/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDeleteProject } from "../../custom-hooks/useDeleteProject";

const Projects = (props) => {
  const { authData } = useContext(AuthContext);
  const [list, setList] = useState();
  const httpAbortCtrl = new AbortController();
  const { deleteProject } = useDeleteProject();

  useEffect(() => {
    const getProjects = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
          method: "GET",
          headers: { Authorization: `Bearer ${authData.token}` },
          signal: httpAbortCtrl.signal,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            setList(data.projects);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Fetch Aborted");
              setList();
            }
          });
      } catch (err) {
        setList();
      }
    };
    // call getProjects
    getProjects();

    // Abort signal
    return () => httpAbortCtrl.abort();
  }, [authData]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to Proceed",
      message: "Are you sure you want to Delete this Project?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteProject(id);
            setList((prevProjects) =>
              prevProjects.filter((proj) => proj._id !== id)
            );
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <HeaderContainer title="Projects" />
      {list && list.length === 0 && (
        <AlertWarning type="warning" message="No Projects Uploaded" />
      )}
      {list &&
        list.length !== 0 &&
        list.map((project) => {
          return (
            <ProjectItem
              id={project._id}
              key={project._id}
              title={project.title}
              date_uploaded={project.date_uploaded}
              description={project.description}
              author={project.creator.fullName}
              avatar={project.creator.image}
              author_id={project.creator._id}
              handleDelete={handleDelete}
            />
          );
        })}
    </React.Fragment>
  );
};

export default Projects;
