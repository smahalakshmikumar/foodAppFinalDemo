import React from "react";
import { Button } from "react-bootstrap";
import NavigationBar from "../../UI/NavigationBar";
import { REMOVE_FROM_WISHLIST, ADD_ITEMS_WISHlIST, CLEAR_WISHLIST } from "../constants";

/**
 * WishlistChild --> presentation comp for wishlist
 * @param {function} clearWishlist -callback func to trigger parent clearing wishlist
 * @param {function} removeFromWishlist- callback to trigger parent removing from wishlist
 * @param {array} state- to populate wishlist
 * @returns WishlistChild component
 */
const WishlistChild = ({ clearWishlist, removeFromWishlist, state }) => {

  /**
   * call parent clear wishlist
   * @returns clearWishlist
   */
  const CallclearWishlist = () => {
    clearWishlist();
  };

  /**
  * call parent removeFromWishlist
  * @param {number} id- sending to remove particular wishlist
  * @returns removeWishlist
  */
  const callRemoveFromWishlist = (id) => {
    removeFromWishlist(id)
  };

  return (
    <div class="container-fluid">
      <NavigationBar></NavigationBar>
      { (state.wishList.length > 0) ? (
        <Button id="clearWishList" style={{ margin: "20px" }} onClick={() => CallclearWishlist()}>
          {CLEAR_WISHLIST}
        </Button>
      ) : (
        <h1>{ADD_ITEMS_WISHlIST}</h1>
      )}
      <div class="card-columns">
        {state?.wishList?.map((data) => (
          <div class="card">
            <div id="headerItem" class="card-header">{data.hotelName}</div>
            <img
              class="card-img-top"
              src={data.resImage}
              alt="designImage"
            ></img>
            <Button
              variant="primary"
              id="removeWishList"
              onClick={() => callRemoveFromWishlist(data.id)} >
              {REMOVE_FROM_WISHLIST}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default React.memo(WishlistChild);
