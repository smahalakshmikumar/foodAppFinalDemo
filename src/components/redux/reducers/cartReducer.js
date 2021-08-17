import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../action/actionTypes";


const initialState = {
  cartList: [],
  isLoading: false,
};
/**
 * cartList reducer to perform add,remove,clear cart
 * @param {array} state - displays state 
 * @param {object} action -action object that has type and payload
 * @returns cartList data
 */
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let updatedCart = {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
      return updatedCart;

    case REMOVE_FROM_CART:
      let updated = {
        ...state,
        cartList: state.cartList.filter((item) => item.id !== action.payload),
      };
      return updated;

    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

export default cartReducer;
