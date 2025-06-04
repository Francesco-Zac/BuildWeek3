import { HAS_ERROR_OFF, HAS_ERROR_ON, SET_ERROR_MESSAGE } from "../action";

const initialState = {
  hasError: false,
  errorMessage: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case HAS_ERROR_ON:
      return {
        ...state,
        hasError: true,
      };

    case HAS_ERROR_OFF:
      return {
        ...state,
        hasError: false,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
