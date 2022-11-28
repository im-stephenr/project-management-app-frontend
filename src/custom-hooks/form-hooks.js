import { useReducer, useCallback, useEffect } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      // /**
      //  * CHECKING THE FORM VALIDITY BY SCANNING ALL isValid values from states
      //  * if all isValid are true then set the isFormValid true
      //  */
      // // separate the property and make the result array / convert the property into number
      const formStateIsValids = Object.values(state.postData);
      let formIsValid = true;
      // since Object property is now a number, iterate it and get the values
      for (let i = 0; i < formStateIsValids.length; i++) {
        if (formStateIsValids[i].isValid !== undefined) {
          formIsValid = formIsValid && formStateIsValids[i].isValid; // logic: if formIsValid is true then remain true in each iteration, else false
        }
      }

      // adding condition since it is displaying empty state
      if (action.input.id != "") {
        return {
          postData: {
            ...state.postData, // return all elements
            // [action.postData.id] = if there is an input ID that is the same inside current state then update its values
            [action.input.id]: {
              value: action.input.value,
              isValid: action.input.isValid,
            },
          },
          isFormValid: formIsValid,
        };
      }
    case "SET_DATA":
      return {
        postData: action.inputs,
        isFormValid: action.isFormValid,
      };
    default:
      return state;
  }
};
const useForm = (initialInputs, initialFormValidation) => {
  // useReducer handling multiple inputs
  const [formStates, dispatch] = useReducer(formReducer, {
    postData: initialInputs,
    isFormValid: initialFormValidation,
  });
  // store the input id and value from input component
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      input: { id, value, isValid },
    });
  }, []);

  const setFormDataHandler = useCallback((inputs, isFormValid) => {
    dispatch({ type: "SET_DATA", inputs, isFormValid });
  }, []);

  return [inputHandler, formStates, setFormDataHandler];
};

export default useForm;
