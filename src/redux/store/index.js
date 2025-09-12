import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profileReducer";
import errorReducer from "../reducers/errorReducer";
import jobsReducer from "../reducers/jobsReducer";

const rootReducer = combineReducers({
  user: profileReducer,
  error: errorReducer,
  jobs: jobsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
