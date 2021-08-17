import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsList, deleteRestaurantsList } from "../redux/action/restaurantsAction";
import RestaurantsListChild from './RestaurantsListChild';
import { CANCEL_PREV_REQUESTS } from "../redux/action/actionTypes";

/**
 * Restaurant list page
 * @returns Restaurant List component
 */
const RestaurantsList = () => {
      const users = useSelector((state) => state?.users?.usersList);
      let dispatch = useDispatch();
      //fetching role from users
      const { role } = users[0];
      //getting  restaurant list,setloader from store
      let { restaurantsList, isLoading } = useSelector(
        (state) => state?.restaurants
      );
      const history = useHistory();
      /**
       * fetching the List of restaurants
       * @returns dispatch fetch restaurants
       */
      useEffect(() => {
        try {
          //dispatching api action through thunk,storing in redux and displaying
          dispatch(fetchRestaurantsList());
        } catch (error) {
          console.log(error.message);
        }
        return () => {
          dispatch({
            type: CANCEL_PREV_REQUESTS
          })
        }
      }, []);

      /**
       *  on selected restaurant click,push to next page
       * @param {number} id -pushing to next page based on id
       * @returns history.push
       */
      const onRestaurantClicked = (id) => {
        history.push(`/restaurant/${id}`);
      };
      
      /**
       *  on remove restaurant
       * @param {number} id -deleting based on id
       *  @returns dispatch action
       */
      const removeRestaurant = (id) => {
        dispatch(deleteRestaurantsList(id));
      };

      return (
        <div class="container-fluid">
          <RestaurantsListChild restaurantsList={restaurantsList} isLoading={isLoading} role={role}
            onRestaurantClicked={onRestaurantClicked} removeRestaurant={removeRestaurant}
            history={history} dispatch={dispatch}
          />
        </div>

      );
};
export default React.memo(RestaurantsList);
