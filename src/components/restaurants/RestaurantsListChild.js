import React from "react";
import NavigationBar from "../../UI/NavigationBar";
import { Button } from "react-bootstrap";
import { FETCH_SAGA_SUCCESS_RESTAURANTLIST } from "../redux/action/actionTypes";
import CircularProgress from '@material-ui/core/CircularProgress';
import {REMOVE_RESTAURANT,VIEW_MORE,SAGA_RES,ADD_TO_RESTAURANT} from '../constants'

/**
 *Restaurant List child component 
 * @param {array} restaurantsList- to populate list of available restaurants
 * @param {boolean} isLoading - to show progress while doing API call
 * @param {string} role- to display the add restaurant or not ,if admin show add restaurant
 * @param {function}onRestaurantClicked- triggers parent function to get selected restaurant
 * @param {function}removeRestaurant- triggers parent function to remove restaurant
 * @param {object}history- provides history object to push to next page
 * @returns Restaurant List child component 
 */
const RestaurantsListChild = ({ restaurantsList, isLoading, role, onRestaurantClicked,
    removeRestaurant,history,dispatch }) => {
    /** 
     * onRestaurantClicked
     * @param {number} id - passing id to parent onRestaurantClicked 
     * @returns calling parent onRestaurantClicked
     */
    const callOnRestaurantClicked = (id) => {
      onRestaurantClicked(id);
    }
    /**
     * calling parent removeRestaurant
     * @param {number} id - passing id to parent onRestaurantClicked to remove
     * @returns calling parent removeRestaurant
     */
    const callRemoveRestaurant = (id) => {
      removeRestaurant(id);
    }
    return (
      <div class="container-fluid">
        <NavigationBar/>
        {isLoading ? <CircularProgress color="secondary" /> : null}
        {role === "admin" ? (
          <Button id="addRestaurant"
            style={{ margin: "10px" }}
            onClick={() => {
              history.push("/addRestaurant");
            }}
          >
            {ADD_TO_RESTAURANT}
          </Button>
        ) : null}
        <Button
          id="fetchSagaRestaurants"
          style={{ margin: "10px" }}
          onClick={() => {

            dispatch({
              type: FETCH_SAGA_SUCCESS_RESTAURANTLIST
            })
          }}
        >
        {SAGA_RES}
        </Button>

        
        <div class="card-columns">
          {restaurantsList?.map((data) => (
            <>
              <div class="card" key={data.id}>
                <div class="card-header">{data.hotelName}</div>
                <img
                  class="card-img-top"
                  src={data.resImage}
                  alt="designImage"
                ></img>
                <div  class="card-footer">
                  <Button id="viewMoreButton"
                    style={{ margin: "10px" }}
                    onClick={() => callOnRestaurantClicked(data.id)}
                  >
                    {VIEW_MORE}
                  </Button>
                  {role === "admin" ? (
                    <Button
                      id="removeRestaurant"
                      style={{ margin: "10px" }}
                      onClick={() => callRemoveRestaurant(data.id)}
                    >
                      {REMOVE_RESTAURANT}
                    </Button>
                  ) : null}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

    );
};
export default React.memo(RestaurantsListChild);
