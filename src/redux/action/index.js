export const SET_USER = "SET_USER";
export const SET_LOADING_ON = "SET_LOADING_ON";
export const SET_LOADING_OFF = "SET_LOADING_OFF";
export const HAS_ERROR_ON = "HAS_ERROR_ON";
export const HAS_ERROR_OFF = "HAS_ERROR_OFF";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const SET_JOBS = "SET_JOBS";

export const setJobsArray = (endpoint) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        console.log("error");
      }
      const dataJ = await response.json();
      console.log(dataJ);
      dispatch({ type: SET_JOBS, payload: dataJ.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserAction = (endpoint, TOKEN) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING_ON });
    try {
      let response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        dispatch({ type: HAS_ERROR_ON });
        dispatch({ type: SET_ERROR_MESSAGE, payload: "Errore nella fetch" });
      }
      const profileData = await response.json();
      dispatch({ type: SET_USER, payload: profileData });
    } catch (error) {
      dispatch({ type: HAS_ERROR_ON });
      dispatch({ type: SET_ERROR_MESSAGE, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING_OFF });
    }
  };
};
