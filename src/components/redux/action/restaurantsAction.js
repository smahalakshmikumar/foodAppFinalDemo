import axios from "axios";
import * as api from "../../../api/api";
import {
  FETCH_SUCCESS_RESTAURANTLIST,
  FETCH_FAILURE_RESTAURANTLIST, SET_LOADER
} from "../action/actionTypes";

/**
 * Fetching list of Restaurants
 * @returns dispatch fetch success list of restaurants
 */
export const fetchRestaurantsList = () => {
  return (async(dispatch, state) => {
    dispatch(setLoader(true));
    try{
      let response = await api.getData("restaurant/");
      dispatch(fetchSuccess(response.data));
      dispatch(setLoader(false))
    
    }
    catch(err){
      dispatch(fetchFailure(err));
      dispatch(setLoader(false))
    }
    // api.getData("restaurant/")
    //   .then((response) => {
    //     dispatch(fetchSuccess(response.data));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     dispatch(fetchFailure(err));
    //   }).finally(() => {
    //     dispatch(setLoader(false))
    //   })
  });
};



/**
 *deleting restaurant using id
 * @param {number} id- deleting based on id
 * @returns  delete restaurant
 * 
 */
export const deleteRestaurantsList = (id) => {
  return (async(dispatch, state) => {
    try{
      dispatch(setLoader(true));
      let response=await api.deleteData(`restaurant/${id}`)
      console.log(response.data)
      dispatch(fetchRestaurantsList());
      dispatch(setLoader(false));
    }
    catch(err){
      dispatch(fetchFailure(err));
      dispatch(setLoader(false))

    }
    // dispatch(setLoader(true));
    // axios.delete(`http://localhost:8000/restaurant/${id}`)
    //   .then((response) => {
    //     dispatch(fetchRestaurantsList());
    //   })
    //   .catch((err) => {
    //     dispatch(fetchFailure(err));
    //   })
    //   .finally(() => { dispatch(setLoader(false)) })
  });
};

/**
 * success response
 * @param {array} data -takes response data
 * @param {object} options -shows options 
 * @returns type:FETCH_SUCCESS_RESTAURANTLIST,data
 */
export const fetchSuccess = (data, options = {}) => {
  return { type: FETCH_SUCCESS_RESTAURANTLIST, payload: data};
};


/**
 * fetch failure to return error 
 * @param {error} displays error 
 * @returns type fetch failure,payload data
 */
export const fetchFailure = (err) => {
  return { type: FETCH_FAILURE_RESTAURANTLIST, payload: err.message };
};


/**
 * set loader action
 * @param {boolean} isLoading -whether to display progress
 * @returns type,payload
 */
export const setLoader = (isLoading) => {
  return { type: SET_LOADER, payload: isLoading };
};


