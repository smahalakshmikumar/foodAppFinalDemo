import { ClearCart } from "../redux/action/cartAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../redux/action/orderAction";
import { useHistory } from "react-router-dom";
import CartChild from './CartChild'


/**
 * Display cart with added Food items
 * @returns cart component
 */
const Cart = () => {
  //dispatching add item,clear cart actions
  let history = useHistory();
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  const users = useSelector((state) => state?.users?.usersList);
  //getting logged in user id
  const { id } = users[0];
  //getting cartlist from state
  const { cartList } = state?.cart;


  /**
   * to calculate total price
   * @returns sum value
   */
  const totalPrice = () => {
    let sum = 0;
    cartList.map((data) => {
      sum = sum + data.cost;
    });
    return sum;
  };

  //forming food items array
  let foodItems = [];
  cartList.map((data) => {
    foodItems.push(data.food);
  });

  //forming object for success order posting
  let order = { foodItems, userId: id, totalPrice: totalPrice() };

  /**
   * handle dialog close,dispatching order to my orders via redux
   * @returns dispatch post order,clear cart
   */
  const handleClose = () => {
    dispatch(postOrder(order));
    dispatch(ClearCart());
    history.push("./myOrder");
  };

  return (
      <CartChild handleClose={handleClose}
       cartList={cartList} totalPrice={totalPrice()} dispatch={dispatch} />
  );
};

export default React.memo(Cart);