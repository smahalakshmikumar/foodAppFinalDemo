import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {ADD_ITEMS_WISHlIST,GO_WISHLIST,RECOMMENDED,COST_OF_FOOD} from '../constants';

/**
 * Restaurant Details child component -- presentation comp
 * @param {array}restaurantdetails-to populate restaurant details
 * @param {function}addCart- call back function that triggers parent
 * @param {function}addtoWishlist- call back function that triggers wishlist in parent
 * @returns Restaurant Details child component
 */

const RestaurantDetailsChild = ({ restaurantdetails, addCart, addtoWishlist, dataSource }) => {
  //MATERIAL ui
  const [open, setOpen] = React.useState(false);
 
  /**
   * @param {string} reason - clciking away to close
   * @returns 
   */
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [isWishlist, setWishClicked] = useState(false);

  /**
   * call parent add cart
   * @param {array}-dataSource- to add data 
   * @returns setOpentrue,addCart
   */
  const callAddCart = (dataSource) => {
    console.log("calledAddtocart")
    setOpen(true);
    addCart(dataSource);
  }

  return (
    <div class="container-fluid">
      <Snackbar severity="success"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Added to cart"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {restaurantdetails?.map((data) => (
        <div key={data.id}>
          <p style={{ color: "gray" }}>{data.openingTime}</p>
          <p style={{ color: "gray" }}>{RECOMMENDED}{data.recommended}</p>
          <p style={{ color: "gray" }}>{COST_OF_FOOD}{data.costForTwo}</p>
          <p style={{ color: "gray" }}>{data.location}</p>
        </div>
      ))}
      <>
        <Button id="addCart"
          style={{ margin: "10px" }}
          onClick={() => {
            callAddCart(dataSource);
          }}
        >
          Add to Cart
        </Button>
        {!isWishlist ? (
          <Button id="addtoWishlist"
            onClick={() => {
              setWishClicked(true);
              addtoWishlist(dataSource);
            }}
          >
            {ADD_ITEMS_WISHlIST}
          </Button>
        ) : (
          <Link to="/wishlist">{GO_WISHLIST}</Link>
        )}
      </>
    </div>
  );
};
export default React.memo(RestaurantDetailsChild);
