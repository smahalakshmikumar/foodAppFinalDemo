import { Button } from "react-bootstrap";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount, shallow } from "enzyme";
import { Router } from "react-router-dom";
import CartChild from "./CartChild";


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
            users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
            restaurants: { restaurantsList: [], isLoading: false, error: "" },
        })

        wrapper = mount(
           <Router history={mockHistory}>
           <Provider store={mockAppstore}>
            <Cart>
           <CartChild />
           </Cart>
           </Provider> 
        </Router>)
    });

    it("should render cart comp", () => {
        //console.log(wrapper.debug())
        //console.log(wrapper.instance())
        console.log(wrapper.instance().handleClose) 

       expect(wrapper).toHaveLength(1);
       expect(wrapper.containsMatchingElement(<CartChild />)).toEqual(true);
    // let handleClose= wrapper.find(<CartChild />).prop('handleClose');
      
        
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