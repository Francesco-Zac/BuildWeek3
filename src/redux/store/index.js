import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profileReducer";
import errorReducer from "../reducers/errorReducer";

const rootReducer = combineReducers({
  user: profileReducer,
  error: errorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
