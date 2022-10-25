import axios from "axios";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const postDog = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.post("http://localhost:3001/dogs", payload);
      alert("Dog was creates successfuly");
      return json;
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getQuery = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/dogs?name=${payload}`
      );
      return dispatch({
        type: "GET_QUERY",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};
