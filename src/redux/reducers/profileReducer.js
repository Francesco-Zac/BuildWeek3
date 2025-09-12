import { SET_LOADING_OFF, SET_LOADING_ON, SET_USER } from "../action";

const initialState = {
  mainUser: null,
  isLoading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        mainUser: action.payload,
      };
    case SET_LOADING_ON:
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOADING_OFF:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
