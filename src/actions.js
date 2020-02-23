import { CHANGE_SEARCH_FIELD } from "./constants";

export const setSearchField = text => ({
  //action been takin call change_search_field
  type: CHANGE_SEARCH_FIELD,
  // payload sending all data needed to reduce or whatever data enter
  payload: text
});
