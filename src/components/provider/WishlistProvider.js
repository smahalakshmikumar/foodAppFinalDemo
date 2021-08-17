import React, { useReducer } from "react";
import wishlistReducer, {
  initialState,
} from "../redux/reducers/wishlistReducer";
export const WishlistContext = React.createContext();

/**
 * wishlist provider component
 * @param {*children}
 * @returns context api provider
 */
const WishlistProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(wishlistReducer, initialState);
  return (
    <WishlistContext.Provider value={{ state, dispatcher }}>
      {children}
    </WishlistContext.Provider>
  );
};
export default WishlistProvider;
