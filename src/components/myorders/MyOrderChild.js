import React from "react";
import NavigationBar from "../../UI/NavigationBar"; 
import {TOTAL,FOOD_ITEM,MY_ORDERS} from "../constants"

/**
 * order child component presentation comp
 * @param {array}userorders- list of userorders
 * @returns order component
*/
const MyOrderChild = ({userorders}) => {
 return (
    <>
      <NavigationBar/>
      <div class="card" style={{ width: "40rem", margin: "20px"}}>
        <div class="card-header">
          <h4>{MY_ORDERS}</h4>
        </div>
        {userorders?.map((data) => (
          < div style={{margin:"20px"}}>
          <h5>Order number: {data.id}</h5>
            <ul class="list-group list-group-flush">
              {data?.foodItems?.map((value,id)=>
               <li class="list-group-item">
              {FOOD_ITEM}{value} 
             </li>)} 
            </ul>
            <div class="card-footer"><h6>{TOTAL}:{data?.totalPrice}</h6></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(MyOrderChild);