import {
  ADD_RESTAURANT,
  REMOVE_FROM_RESTAURANTS,
  CLEAR_RESTAURANTS,
} from "../action/actionTypes";

const initialState = {
  restaurantList: [],
  isLoading: false,
};

/**
 * restaurant reducer to perform operations like add,remove,clear restaurants
 * @param {array} state - displays state 
  * @param {object} action -action object that has type and payload
 * @returns updated restaurant state
 */
const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESTAURANT:
      let updatedCart = {
        ...state,
        restaurantList: [...state.restaurantList, action.payload],
      };
      return updatedCart;
      
    case REMOVE_FROM_RESTAURANTS:
      let updated = {
        ...state,
        restaurantList: state.restaurantList.filter(
          (item) => item.id !== action.payload
        ),
      };
      return updated;

    case CLEAR_RESTAURANTS:
      return initialState;
    default:
      return state;
  }
};

export default restaurantReducer;
