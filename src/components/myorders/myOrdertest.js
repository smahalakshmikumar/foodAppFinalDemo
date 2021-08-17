import { Button } from "react-bootstrap";
import MyOrder from "./MyOrder";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount, shallow } from "enzyme";
import { Router } from "react-router-dom";
import MyOrderChild from "./MyOrderChild";


describe("Given CartParent comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatch = jest.fn();
    let mockHistory={push:jest.fn(),listen:jest.fn(),location:{}}

    beforeEach(() => {
        //redux
        mockAppstore = createStore(rootReducer, {
            cart: {
                cartList: [{
                    "id": 6,
                    "hotelName": "Vaa Bro", "food": "dosa", "cost": "1000"
                }],
                isLoading: false
            },
            orders:{
                "id": 6,
                userorders: [{
                    "id": 6,
                    "hotelName": "Vaa Bro", "food": "dosa", "totalPrice": "1000",
                    "foodItems":["dosa"]
                }],
                confirmedOrder: [{
                    "id": 6,
                    "hotelName": "Vaa Bro", "food": "dosa", "totalPrice": "1000",
                    "foodItems":["dosa"]
                }]
              },
            users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
            restaurants: { restaurantsList: [], isLoading: false, error: "" },
        })

        wrapper = mount(
           <Router history={mockHistory}>
           <Provider store={mockAppstore}>
            <MyOrder/>
           </Provider> 
        </Router>)
    });

    it("should render cart comp", () => {
        
       expect(wrapper).toHaveLength(1);
       expect(wrapper.containsMatchingElement(<MyOrderChild />)).toEqual(true);
      
        
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