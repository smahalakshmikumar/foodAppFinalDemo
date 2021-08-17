import {
  ADD_RESTAURANT,
  REMOVE_FROM_RESTAURANTS,
  CLEAR_RESTAURANTS,
} from "./actionTypes";


/**
 * Add to restaurant action
 * @param {number} id-adding based on id
 * @returns restaurant
 */
export const addToRestaurant = (restaurant) => {
  return {
    type: ADD_RESTAURANT,
    payload: restaurant,
  };
};

/**
 * remove frm restaurant action
 * @param {number} id- deleting based on id
 * @returns REMOVE_FROM_RESTAURANTS
 */
export const removeFromRestaurants = (id) => {
  return {
    type: REMOVE_FROM_RESTAURANTS,
    payload: id,
  };
};


/**
 * clears Restaurant action
 * @returns clearRestaurants
 */
export const clearRestaurants = () => {
  return {
    type: CLEAR_RESTAURANTS,
  };
};
