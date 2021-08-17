import React from "react";
import {
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../redux/action/actionTypes";
import useStore from "../custom-hooks/useStore";
import WishlistChild from './WishlistChild'

/**
 * Wishlist component displays items added to wishlist
 * @returns Wishlist component
 */
const Wishlist = () => {
      //using context to get the data
      const { state, dispatcher } = useStore();
      //dispatch clear wishlist
      const clearWishlist = () => {
        dispatcher({ type: CLEAR_WISHLIST });
      };
      //dispatch remove wishlist
      const removeFromWishlist = (id) => {
        dispatcher({ type: REMOVE_FROM_WISHLIST, payload: id });
      };

      return (
        <div class="container-fluid">
          <WishlistChild removeFromWishlist={removeFromWishlist}
           clearWishlist={clearWishlist}  />
        </div>
      );
};

export default React.memo(Wishlist);
