import React, { PureComponent, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../custom-hooks/form-hooks";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import MainContainer from "../../shared/components/MainContainer";

const UserAdd = () => {
  const [inputHandler, formStates] = useForm({ isFormValid: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formStates);
    console.log("SUBMITTED");
  };

  return (
    <MainContainer
      title="Sign Up"
      footer={<Link to="/login">Have an account? Go to login</Link>}
      col="12"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your Full name"
                label="Full name"
                inputHandler={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=3"]}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                label="Email address"
                inputHandler={inputHandler}
                validation={["REQUIRED", "EMAIL"]}
              />
              <label htmlFor="email"></label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                label="Password"
                inputHandler={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=6"]}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="Confirm password"
                label="Confirm Password"
                inputHandler={inputHandler}
                validation={["REQUIRED", "MIN_LENGTH=6"]}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <Button
              name="Create Account"
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

export default UserAdd;
