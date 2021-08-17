import React, { useEffect, useState} from "react";
import { getData } from "../../api/api";
import { useDispatch} from "react-redux";
import { addToCart } from "../redux/action/cartAction";
import { ADD_TO_WISHLIST } from "../redux/action/actionTypes";
import useStore from "../custom-hooks/useStore";
import RestaurantDetailsChild from "./RestaurantDetailsChild";

/**
 * Restaurant Details Page which shows details of restaurant
 * @param {number} restaurantID- to fetch selected restaurant
 * @returns Restaurant Details component
 */
const RestaurantDetails = ({ restaurantID }) => {
  const [dataSource, setData] = useState([]);
  const { restaurantdetails } = dataSource;
  const dispatch = useDispatch();
//using custom hook for use contxt
  const { dispatcher } = useStore();
  useEffect(() => {
    //fetching the details of selected Restaurant
    try {
     getData(`restaurant/${restaurantID}?_embed=restaurantdetails`).then(
        (res) => {
          setData(res.data);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, [restaurantID]);

  /**
   * add to cart
   * @returns dispatch action
   * @param {array} data- add to cart data 
   */
  const addCart = (data) => {
    dispatch(addToCart(data));
  };

  /**
  *  add to wishlist
  *  @param {array} data- add to wishlist data
  * @returns dispatch ADD TO WISHLIST,data 
  */
  const addtoWishlist = (data) => {
    dispatcher({ type: ADD_TO_WISHLIST, payload: data });
  };

  return (
    <div class="container-fluid">
            <RestaurantDetailsChild restaurantdetails={restaurantdetails} addCart={addCart} 
            addtoWishlist={addtoWishlist} dataSource={dataSource}/>
    </div>
  );
};
export default React.memo(RestaurantDetails);
