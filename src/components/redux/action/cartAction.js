import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./actionTypes";

/**
 * add to cart
 * @param { array } foodItem- adding food to cart
 * @returns add to cart
 */
export const addToCart = (foodItem) => {
  return {
    type: ADD_TO_CART,
    payload: foodItem,
  };
};


/**
 * remove from cart
 * @param {number} id- removing based on id
 * @returns remove from cart
 */
export const RemoveFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};


/**
 * clears cart
 * @returns clear cart
 */
export const ClearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
