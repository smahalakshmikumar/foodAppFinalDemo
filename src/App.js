import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WishlistProvider from "./components/provider/WishlistProvider";
//implementing Lazy loading in components
const RestaurantsList = React.lazy(() =>
  import("./components/restaurants/RestaurantsList")
);
const AddRestaurant = React.lazy(() =>
  import("./components/AddRestaurant/AddRestaurant")
);
const Registration = React.lazy(() =>
  import("./components/registration/Registration")
);
const Restaurant = React.lazy(() =>
  import("./components/restaurantSelected/Restaurant")
);
const RestaurantDetails = React.lazy(() =>
  import("./components/restaurantSelected/RestaurantDetails")
);
const Cart = React.lazy(() => import("./components/cart/Cart"));
const LoginForm = React.lazy(() => import("./components/login/LoginForm"));
const Wishlist = React.lazy(() => import("./components/wishlist/Wishlist"));
const MyOrder = React.lazy(() => import("./components/myorders/MyOrder"));

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Switch>
            <WishlistProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Route component={LoginForm} path="/" exact={true} />
                <Route component={Registration} path="/registration" />
                <Route component={RestaurantsList} path="/restaurants" />
                <Route component={Restaurant} path="/restaurant/:id" />
                <Route
                  component={RestaurantDetails}
                  path="/RestaurantDetails"
                />
                <Route component={Wishlist} path="/wishlist" />
                <Route component={Cart} path="/cart" />
                <Route component={AddRestaurant} path="/addRestaurant" />
                <Route component={MyOrder} path="/myOrder" />
              </Suspense>
            </WishlistProvider>
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
