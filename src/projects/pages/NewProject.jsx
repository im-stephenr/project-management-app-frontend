import React, { Component } from "react";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import MainContainer from "../../shared/components/MainContainer";
import useForm from "../../custom-hooks/form-hooks";

const NewProject = (props) => {
  const [inputHandler, formStates] = useForm({});

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("SUBMITTED", formStates);
  };

  return (
    <MainContainer title="Add New Project" col="12">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="inputTitletitle"
                type="text"
                placeholder="Enter your Title"
                label="Title"
                inputHandler={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=3"]}
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
                inputHandler={inputHandler}
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
                type="file"
                id="file"
                validation={["REQUIRED"]}
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
                inputHandler={inputHandler}
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
                inputHandler={inputHandler}
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
