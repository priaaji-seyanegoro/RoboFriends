import { CHANGE_SEARCH_FIELD } from "./constants";

// this is state
const initialState = {
  searchField: ""
};

// reducer
export const searchRobots = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      //returning new object and copy initialState and changes value property of searchField

      //   return Object.assign({}, state, { searchField: action.payload });
      return { ...state, searchField: action.payload };

    default:
      return state;
  }
};
