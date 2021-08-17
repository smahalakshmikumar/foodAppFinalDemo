import React,{useState} from "react";
import NavigationBar from "../../UI/NavigationBar";
import { Button } from "react-bootstrap";
import RestaurantDetails from "./RestaurantDetails";
import {RESTAURANT_RATING,SEE_MORE} from "../constants";

/**
 *  RestaurantChild component  presentation comp
 * @returns RestaurantChild
 * @param {array} datasource- data to populate selected restaurant
 */
const RestaurantChild = ({dataSource})=> {
const [isClicked, setClick] = useState(false);
const { resImage, id, hotelName, rating, genre, food, cost } = dataSource;


const seeMoreClicked=()=>{
   setClick(true)
}
 return (
    <div class="container-fluid">
     <NavigationBar></NavigationBar>
      <div class="row" style={{ padding: "10px" }} key={id}>
        <div class="col-md-6 col-sm-12">
          <img class="card-img-top" src={resImage} alt="designImage"></img>
        </div>
        <div class="col-md-6 col-sm-12">
          <h1>{hotelName}</h1>
          <p id="header-card" class="card-header">{genre}</p>
          <p id="details-card">
            {food}:{cost}
          </p>
              <p>{RESTAURANT_RATING} {rating}</p>
          {!isClicked ? (
            <Button id="seeMore" onClick={seeMoreClicked}>{SEE_MORE}</Button>
          ) : (
            <RestaurantDetails id="restaurantDetails"  restaurantID={id} />
          )}
        </div>
      </div> 
    </div>
  );
};
export default React.memo(RestaurantChild);
