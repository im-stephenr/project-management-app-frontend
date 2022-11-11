import { useReducer, useCallback, useEffect } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      /**
       * CHECKING THE FORM VALIDITY BY SCANNING ALL isValid values from states
       * if all isValid are true then set the isFormValid true
       */
      // separate the property and make the result array / convert the property into number
      const formStateIsValids = Object.values(state);
      let formIsValid = true;
      // since Object property is now a number, iterate it and get the values
      for (let i = 0; i < formStateIsValids.length; i++) {
        if (formStateIsValids[i].isValid !== undefined) {
          formIsValid = formIsValid && formStateIsValids[i].isValid; // logic: if formIsValid is true then remain true in each iteration, else false
        }
      }

      // adding condition since it is displaying empty state
      if (action.postData.id != "") {
        return {
          ...state, // return all elements
          [action.postData.id]: {
            value: action.postData.value,
            isValid: action.postData.isValid,
          }, // only works if we initialized data from useForm since we are dynamically using/assigning the property
          isFormValid: formIsValid,
        };
      }
    default:
      return state;
  }
};
const useForm = (initialInputs, initialFormValidation) => {
  // useReducer handling multiple inputs
  const [formStates, dispatch] = useReducer(
    formReducer,
    { ...initialInputs },
    initialFormValidation
  );

  // store the input id and value from input component
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        postData: { id, value, isValid },
      });
    },
    [initialInputs, formStates]
  );

  return [inputHandler, formStates];
};

export default useForm;
