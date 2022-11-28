import React, { Component } from "react";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import MainContainer from "../../shared/components/MainContainer";
import useForm from "../../custom-hooks/form-hooks";
import { useAddProject } from "../../custom-hooks/useAddProject";

const NewProject = (props) => {
  const [inputHandler, formStates] = useForm(
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
  const { addProject, error } = useAddProject();

  const handleFile = (e) => {
    const files = [];
    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      inputHandler(e.target.id, files, true);
      console.log("FILES: ", files);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProject(formStates.postData);
    console.log("SUBMITTED", formStates);
  };

  return (
    <MainContainer title="Add New Project" col="12">
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
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Sample Image of your Project
              </label>
              <input
                multiple
                className="form-control"
                name="images"
                type="file"
                id="files"
                validation={["REQUIRED"]}
                onChange={handleFile}
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
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <Button
              name="Add Project"
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

export default NewProject;
