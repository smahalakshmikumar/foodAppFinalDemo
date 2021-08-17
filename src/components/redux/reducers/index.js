import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import loginReducer from "./loginReducer";
import orderReducer from "./orderReducer";
import restaurantsReducer from "./restaurantsReducer";

/**
 * Root reducer to combine reducers
 */
const rootReducer = combineReducers({
  cart: cartReducer,
  users: loginReducer,
  restaurants: restaurantsReducer,
  orders: orderReducer,
});

export default rootReducer;
