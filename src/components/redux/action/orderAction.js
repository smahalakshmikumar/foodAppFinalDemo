import {
  POST_FAIL_ORDERS,
  POST_SUCCESS_ORDERS,
  FETCH_SUCCESS_ORDERS,
  SET_LOADER,
  FETCH_FAILURE_ORDERS
} from "./actionTypes";
import * as api from "../../../api/api";

/**
 * post order action
 * @param {array} order- to post particular order
 * @returns post order
 */
export const postOrder = (order) => {
  return (async(dispatch, state) => {
    try{
      let response= await api.postData("userorders", order)
      console.log(response.data)
      dispatch(postSuccess(response.data));
    }
    catch(err){
      dispatch(postFailure(err))
    }
  //   api.postData("userorders", order)
  //     .then((response) => {
  //       dispatch(postSuccess(response.data));
  //     })
  //     .catch((err) => dispatch(postFailure(err)));
  // };
});
};

/**
 * fetch success action
 * @param {array} data- upon success response
 * @param {object} options-optional params
 * @returns FETCH_SUCCESS_ORDERS
 */
 export const fetchOrderSuccess = (data, options = {}) => {
  return { type: FETCH_SUCCESS_ORDERS, payload: data};
};

/**
 * post success action
 * @param {array}  data- posting success data
 * @returns success data
 */
export const postSuccess = (data) => {
  return { type: POST_SUCCESS_ORDERS, payload: data };
};

/**
 * failure action
 * @param {object} err- error object
 * @returns failure data
 */
export const postFailure = (err) => {
  return { type: POST_FAIL_ORDERS, payload: err.message };
};

/**
 * fetch failure to return error 
 * @param {error} displays error 
 * @returns type fetch failure,payload data
 */
 export const fetchFailure = (err) => {
  return { type: FETCH_FAILURE_ORDERS, payload: err.message };
};

/**
 * set loader action
 * @param {boolean} isLoading -whether to display progress
 * @returns type,payload
 */
 export const setLoader = (isLoading) => {
  return { type: SET_LOADER, payload: isLoading };
};