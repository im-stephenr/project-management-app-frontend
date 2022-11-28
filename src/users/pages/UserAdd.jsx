import React, {
  PureComponent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import useForm from "../../custom-hooks/form-hooks";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import MainContainer from "../../shared/components/MainContainer";
import { useSignup } from "../../custom-hooks/useSignup";
import AlertWarning from "../../shared/components/AlertWarning";

const UserAdd = () => {
  const [inputHandler, formStates] = useForm(
    {
      username: { value: "", isValid: false },
      fullName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      passwordConfirm: { value: "", isValid: false },
      image: { value: "", isValid: false },
    },
    false
  );
  const { signUp, error } = useSignup();

  const fileHandler = (e) => {
    if (e.target.files.length === 1) {
      inputHandler(e.target.id, e.target.files[0], true);
      console.log("UPLOADED");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // signUp(formStates);
    console.log(formStates);
  };

  return (
    <MainContainer
      title="Sign Up"
      footer={<Link to="/login">Have an account? Go to login</Link>}
      col="12"
    >
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="username"
                type="text"
                placeholder="Enter your Username"
                label="Username"
                validation={["REQUIRED", "MIN_LENGTH=3"]}
                onFormInput={inputHandler}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Avatar
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                accept=".jpg,.png,.jpeg"
                onChange={fileHandler}
                validation={["REQUIRED"]}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-floating mb-3 mb-md-0">
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your Full name"
                label="Full name"
                validation={["REQUIRED", "MIN_LENGTH=3"]}
                onFormInput={inputHandler}
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
                validation={["REQUIRED", "EMAIL"]}
                onFormInput={inputHandler}
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
                validation={["REQUIRED", "MIN_LENGTH=6"]}
                onFormInput={inputHandler}
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
                validation={["REQUIRED", "MIN_LENGTH=6"]}
                onFormInput={inputHandler}
              />
            </div>
          </div>
        </div>
        {error && <AlertWarning type="danger" message={error} />}
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
