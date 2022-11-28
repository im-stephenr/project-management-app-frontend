import React, { Component, useContext, useState, useEffect } from "react";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import MainContainer from "../../shared/components/MainContainer";
import useForm from "../../custom-hooks/form-hooks";
import { useUpdateProject } from "../../custom-hooks/useUpdateProject";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AlertWarning from "../../shared/components/AlertWarning";

const UpdateProject = (props) => {
  const pid = useParams().pid;
  const [projectDetail, setProjectDetail] = useState({});
  const { updateProject, error } = useUpdateProject();
  const { authData } = useContext(AuthContext);
  const httpAbortCtrl = new AbortController();
  const [inputHandler, formStates, setFormDataHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      github: {
        value: "",
        isValid: false,
      },
      url: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //   Fetch Data
  useEffect(() => {
    const getProjectById = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}`, {
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
            setProjectDetail(data);
            setFormDataHandler(
              {
                title: {
                  value: data.title,
                  isValid: true,
                },
                description: {
                  value: data.description,
                  isValid: true,
                },
                github: {
                  value: data.github,
                  isValid: true,
                },
                url: {
                  value: data.url,
                  isValid: true,
                },
              },
              true
            );
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Fetch Aborted");
            }
            setProjectDetail({});
          });
      } catch (err) {
        setProjectDetail({});
      }
    };
    // call getProjects
    getProjectById();

    // Abort signal
    return () => httpAbortCtrl.abort();
  }, [authData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProject(formStates.postData, pid);
  };

  return (
    <MainContainer title="Update Project" col="12">
      {error && <AlertWarning type="danger" message={error} />}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="title"
                type="text"
                placeholder="Enter your Title"
                label="Title"
                onFormInput={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=3"]}
                accept=".jpg,.png,.jpeg"
                value={formStates.postData.title.value}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="mb-3 mb-md-0">
              <Input
                id="description"
                type="textarea"
                placeholder="Description"
                label="Description"
                onFormInput={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=5"]}
                value={formStates.postData.description.value}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="github"
                type="text"
                placeholder="Enter your Github Repo"
                label="Github Repo"
                onFormInput={inputHandler}
                value={formStates.postData.github.value}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="url"
                type="text"
                placeholder="Enter your Project Url"
                label="Url"
                onFormInput={inputHandler}
                value={formStates.postData.url.value}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <Button
              name="Update Project"
              class={`btn-primary btn-block ${
                !formStates.isFormValid && "disabled"
              }`}
            />
          </div>
        </div>
      </form>
    </MainContainer>
  );
};

export default UpdateProject;
