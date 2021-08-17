import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../api/api";
import RestaurantChild from "./RestaurantChild";


/**
 * selected Restaurant page
 * @returns selected Restaurant component
 */
const Restaurant = () => {
  const params = useParams();
  const [dataSource, setData] = useState([]);
  let paramID = params.id;

  /**
   *fetching the selected restaurant data
   * @returns axios response
   */
  useEffect(() => {
    getData(`restaurant/${paramID}`).then((res) => {
      setData(res.data);
    });
  }, [params.id]);

  return (
    <div class="container-fluid">
      <RestaurantChild dataSource={dataSource}/>
    </div>
  );
};
export default React.memo(Restaurant);
