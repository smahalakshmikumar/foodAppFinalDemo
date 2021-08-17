import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyOrderChild from "./MyOrderChild"
import { FETCH_SAGA_SUCCESS_ORDERS } from "../redux/action/actionTypes";

/**
 * Displays list of orders
 * @returns order component
 */
const MyOrder = () => {
  const userLoggedin = useSelector((state) => state?.users?.usersList);
  const orders = useSelector((state) => state?.orders);
  const { userorders } = orders.confirmedOrder;
  let dispatch = useDispatch();
  const { id } = userLoggedin[0];
  /**
   * getting user orders from DB
   * @returns Dispatch get axios call
   */
  useEffect(() => {
    dispatch({
      type: FETCH_SAGA_SUCCESS_ORDERS,
      payload: id
    })

  }, []);

  return (
      <MyOrderChild userorders={userorders} />
  );
};

export default React.memo(MyOrder);