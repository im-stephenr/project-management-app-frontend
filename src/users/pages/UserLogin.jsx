import React from "react";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import MainContainer from "../../shared/components/MainContainer";
import { Link } from "react-router-dom";
import AlertWarning from "../../shared/components/AlertWarning";
import useForm from "../../custom-hooks/form-hooks";
import { useLogin } from "../../custom-hooks/useLogin";

const UserLogin = () => {
  // Handle Form
  const [inputHandler, formStates] = useForm(
    {
      username: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const { login, error } = useLogin();

  // Handle Login
  const handleLogin = (event) => {
    event.preventDefault();
    login(
      formStates.postData.username.value,
      formStates.postData.password.value
    );
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
            onFormInput={inputHandler}
            validation={["REQUIRED"]}
            value=""
          />
        </div>
        <div className="form-floating mb-3">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            label="Password"
            onFormInput={inputHandler}
            validation={["REQUIRED"]}
            value=""
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
