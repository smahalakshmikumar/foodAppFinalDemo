import {
  POST_SUCCESS_ORDERS,FETCH_SUCCESS_ORDERS,SET_LOADER
} from "../action/actionTypes";

export const initialState = {
  myOrders: [],
  confirmedOrder:[],
  isLoading: false,
  
};
/**
 * Order reducer used to send post success, fetch success orders
 * @param {array} state - displays state 
  * @param {object} action -action object that has type and payload
 * @returns order
 */
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SUCCESS_ORDERS:
      let order = {
        ...state,
        myOrders: action.payload,
      };
      return order;

      case FETCH_SUCCESS_ORDERS:
        let confirmedOrder = {
          ...state,
          confirmedOrder: action.payload,
        };
        return confirmedOrder;
        case SET_LOADER:
          return {...state,isLoading:action.payload}
    default:
      return state;
  }
};

export default orderReducer;