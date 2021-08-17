import {
  FETCH_SUCCESS_RESTAURANTLIST,
  FETCH_FAILURE_RESTAURANTLIST,
  SET_LOADER
} from "../action/actionTypes";

const initialState = { restaurantsList: [], isLoading: false, error: "" };
/**
 * restaurantsReducer to perform fetch success,failure and set loader actions
 * @param {array} state - displays state 
  * @param {object} action -action object that has type and payload
 * @returns updated state
 */
const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_RESTAURANTLIST:
      return { ...state, restaurantsList: action.payload,error: "" };
    case FETCH_FAILURE_RESTAURANTLIST:
      return { ...state, error: action.payload, restaurantsList: [] };
      case SET_LOADER:
        return {...state,isLoading:action.payload}
    default:
      return state;
  }
};

export default restaurantsReducer;
