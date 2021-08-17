import { useContext } from "react";
import { WishlistContext } from "../provider/WishlistProvider";

/**
 * custom hook to use context in multiple pages
 * @returns useStore custom hook
 */
const useStore = () => {
  const { state, dispatcher } = useContext(WishlistContext);
  return { state, dispatcher };
};

export default useStore;
