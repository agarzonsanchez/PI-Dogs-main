const initialState = {
  allDogs: [],
  copyAllDogs: [],
  temperaments: [],
  dog_details: [],
  dogsWeight: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "GET_QUERY":
      return {
        ...state,
        allDogs: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export { rootReducer };
