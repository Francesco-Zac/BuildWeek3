import { SET_JOBS, SET_LOADING_OFF_JOBS, SET_LOADING_ON_JOBS } from "../action";

const initialState = {
  content: null,
  isLoadongJ: false,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        content: action.payload,
      };
    case SET_LOADING_ON_JOBS:
      return {
        ...state,
        isLoadingJ: true,
      };
    case SET_LOADING_OFF_JOBS:
      return {
        ...state,
        isLoadingJ: false,
      };
    default:
      return state;
  }
};

export default jobsReducer;
