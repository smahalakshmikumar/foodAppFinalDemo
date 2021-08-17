import {
  ADD_TO_WISHLIST,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../action/actionTypes";

export const initialState = {
  wishList: [],
  isLoading: false,
};
/**
 * wishlistReducer
 * @param {array} state - displays state 
 * @param {object} action -action object that has type and payload
 * @returns wishList data
 */
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      let updatedCart = {
        ...state,
        wishList: [...state.wishList, action.payload],
      };
      console.log(updatedCart);
      return updatedCart;
    case REMOVE_FROM_WISHLIST:
      let updated = {
        ...state,
        wishList: state.wishList.filter((item) => item.id !== action.payload),
      };
      console.log(updated);
      return updated;

    case CLEAR_WISHLIST:
      return initialState;
    default:
      return state;
  }
};

export default wishlistReducer;
