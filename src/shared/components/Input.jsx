import React, { useCallback, useEffect, useReducer, useState } from "react";

const handleInputValidation = (validationTypes, value) => {
  // check input validation
  let validationType;
  let initializedCount;
  let result = {};

  if (validationTypes) {
    for (let i = 0; i < validationTypes.length; i++) {
      validationType = validationTypes[i];
      // check if validator has equals
      if (validationType.indexOf("=") !== -1) {
        initializedCount = validationType.split("=").pop(); // get the number value
        validationType = validationType.split("=")[0]; // get the validation name
      }

      if (validationType === "REQUIRED") {
        if (value === "") {
          result = {
            errorMessage: "Please don't leave this field blank.",
            isValid: false,
          };
          return result;
        }
      }
      if (validationType === "MIN_LENGTH") {
        if (value.trim().length < initializedCount) {
          result = {
            errorMessage:
              "This input has minimum characters of " + initializedCount,
            isValid: false,
          };
          return result;
        }
      }
      if (validationType === "EMAIL") {
        if (value.trim().match(/^\S+@\S+\.\S+$/) === null) {
          result = {
            errorMessage: "This input should be email format",
            isValid: false,
          };
          return result;
        }
      }
    }
  }
  // if there's no input validation, return default
  return {
    errorMessage: "",
    isValid: true,
  };
};

// useReducer for input
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        id: action.inputData.id,
        value: action.inputData.value,
        validation: action.inputData.validation,
      };
    case "BLUR":
      return {
        ...state,
        validation: action.inputData.validation,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    id: props.id, // initialized id
    value: props.value || "", // initialized value if no value property from parent then show empty value
    validation: { errorMessage: "", isValid: false }, // initialized validation
  });

  // trigger only to class validity if use has touched the input
  const [isTouched, setIstouched] = useState(false);

  // pass the input id and value useForm hook inputHandler, triggers if inputState changes
  useEffect(() => {
    props.inputHandler(
      inputState.id,
      inputState.value,
      inputState.validation.isValid
    );
  }, [inputState]);

  // Input element onInput
  const onInputHandler = (e) => {
    dispatch({
      type: "CHANGE",
      inputData: {
        ...inputState,
        id: e.target.id,
        value: e.target.value,
        validation: handleInputValidation(props.validation, e.target.value),
      },
    });
  };

  // Input element onBlur
  const onBlurHandler = (e) => {
    setIstouched(true);
    dispatch({
      type: "BLUR",
      inputData: {
        validation: handleInputValidation(props.validation, e.target.value),
      },
    });
  };

  // dynamic elements
  const element =
    props.type === "textarea" ? (
      <>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          onChange={onInputHandler}
          onBlur={onBlurHandler}
          className={`form-control 
          ${isTouched && !inputState.validation.isValid && "is-invalid"} 
          ${isTouched && inputState.validation.isValid && "is-valid"}`}
          rows="5"
          id={props.id}
        ></textarea>
      </>
    ) : (
      <>
        <input
          className={`form-control 
          ${isTouched && !inputState.validation.isValid && "is-invalid"} 
          ${isTouched && inputState.validation.isValid && "is-valid"}`}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={onInputHandler}
          onBlur={onBlurHandler}
        />
        <label htmlFor={props.id}>{props.label}</label>
      </>
    );
  return (
    <React.Fragment>
      {element}
      {inputState && !inputState.validation.isValid}
      <div className="invalid-feedback">
        {inputState.validation.errorMessage}
      </div>
    </React.Fragment>
  );
};

export default Input;
