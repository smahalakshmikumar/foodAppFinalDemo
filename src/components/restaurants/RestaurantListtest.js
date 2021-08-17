import { Button } from "react-bootstrap";
import RestaurantsList from "./RestaurantsList";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount, shallow } from "enzyme";
import { Router } from "react-router-dom";
import RestaurantsListChild from "./RestaurantsListChild";


describe("Given CartParent comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatch = jest.fn();
    let mockHistory={push:jest.fn(),listen:jest.fn(),location:{}}

    beforeEach(() => {
        //redux
        mockAppstore = createStore(rootReducer, {
            restaurants: { restaurantsList: [{
                id: 6,
                "hotelName": "Vaa Bro",
                "rating": "4",
                "genre": "juice,snacks",
                "type": "JUICES",
                "food": "pineapple juice",
                "cost": 200,
                "resImage": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/jqxlnlswe1vbbmc9mo9r"
              }], isLoading: false, error: "" },
              users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },

        })

        wrapper = mount(
           <Router history={mockHistory}>
           <Provider store={mockAppstore}>
           <RestaurantsList/>
           </Provider> 
        </Router>)
    });

    it("should render restaurant comp", () => {
        
       expect(wrapper).toHaveLength(1);
       expect(wrapper.containsMatchingElement(<RestaurantsListChild />)).toEqual(true);
        
    })
    // describe('when "handleClose" callback is triggered', () => {

    //     it("should dispatch actions", () => {
    //         // const handleClose= jest.fn();
    //         // handleClose();
    //         // expect(dispatch).toHaveBeenCalled();
    //         const wrapperComp=shallow(<Cart/>)
    //     })
    // })

    
})