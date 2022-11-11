import React, { useEffect, useReducer, useState } from "react";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import MainContainer from "../../shared/components/MainContainer";
import { Link } from "react-router-dom";
import AlertWarning from "../../shared/components/AlertWarning";
import useForm from "../../custom-hooks/form-hooks";

const DUMMY_USER = [
  {
    id: "1",
    username: "admin",
    password: "123123123",
    name: "StephenR",
  },
  {
    id: "2",
    username: "admin2",
    password: "123123123",
    name: "KayenL",
  },
];

const UserLogin = () => {
  // Handle Form
  const [inputHandler, formStates] = useForm({});
  // Display error
  const [error, setError] = useState("");
  // Handle Login
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(formStates);
    // Check credentials
    const getUser = DUMMY_USER.find(
      (u) =>
        u.username === formStates.username.value &&
        u.password === formStates.password.value
    );
    if (getUser) {
      console.log("Logged in successfully! Redirecting to login...");
      setError("");
    } else {
      console.log("Invalid credentials!");
      setError("Invalid credentials!");
    }
  };

  return (
    <MainContainer
      title="Login"
      footer={<Link to="/signup">Need an account? Sign up!</Link>}
      col="5"
    >
      <form method="POST" onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <Input
            id="username"
            placeholder="Username"
            type="text"
            label="Username"
            inputHandler={inputHandler}
            validation={["REQUIRED"]}
          />
        </div>
        <div className="form-floating mb-3">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            label="Password"
            inputHandler={inputHandler}
            validation={["REQUIRED"]}
          />
        </div>
        {error && <AlertWarning type="danger" message={error} />}
        <div className="d-grid">
          <Button
            type="submit"
            name="Login"
            class={`btn-primary btn-block ${
              !formStates.isFormValid && "disabled"
            }`}
          />
        </div>
      </form>
    </MainContainer>
  );
};

export default UserLogin;
