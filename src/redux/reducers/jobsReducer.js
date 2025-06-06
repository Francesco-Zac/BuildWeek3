import { SET_JOBS } from "../action";

const initialState = {
  content: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        content: action.payload,
      };
    // case SET_LOADING_ON:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case SET_LOADING_OFF:
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    default:
      return state;
  }
};

export default jobsReducer;
