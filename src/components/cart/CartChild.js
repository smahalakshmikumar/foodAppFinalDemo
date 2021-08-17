import { Button } from "react-bootstrap";
import { ClearCart, RemoveFromCart } from "../redux/action/cartAction";
import React from "react";
import NavigationBar from "../../UI/NavigationBar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { data } from "jquery";


/**
 * cart child component -- presentation comp
 * @param { handleClose, cartList, totalPrice, dispatch }
 * @returns cart child component
 */
const CartChild = ({ handleClose, cartList, totalPrice, dispatch }) => {
  const [open, setOpen] = React.useState(false);

  /**
  * handle close
  * @returns setOpen to false, handle close
  */
  const callHandleClose = () => {
    setOpen(false);
    handleClose();
  };

  /**
   * confirmClick
   *@returns opening dialog on confirm click
   */
  const confirmClick = () => {
    setOpen(true);
  };

  return (
    <div class="container-fluid">
      <NavigationBar></NavigationBar>
      <Dialog
        open={open}
        onClose={callHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you really want to confirm this order?"}</DialogTitle>
        <DialogActions>
          <Button onClick={callHandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={callHandleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <h2>Total Price: {totalPrice}</h2>
      <div class="card-columns" >
        {cartList?.map((data) => (
          <div class="card" key={data.id}>
            <h4 class="card-header" id="hotelName">{data.hotelName}</h4>
            <img
              class="card-img-top"
              src={data.resImage}
              alt="designImage"
            ></img>
            <h5>
              {data.food}:{data.cost}
            </h5>
            <Button
             className="Remove"
              variant="primary"
              onClick={() => dispatch(RemoveFromCart(data.id))}
            >
              Remove from cart
            </Button>
          </div>
        ))}
      </div>
      {cartList.length > 0 ? (
        <>
          <Button id='clear-button'
            style={{ margin: "20px" }}
            onClick={() => dispatch(ClearCart())}
          >
            Clear Cart
          </Button>
          <Button id='confirm-button' style={{ margin: "20px" }} 
          onClick={() => confirmClick()}>
            Confirm order
          </Button>
        </>
      ) : (
        <h1>Add items to cart</h1>
      )}
    </div>
  );
};

export default React.memo(CartChild);