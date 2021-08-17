import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import { Button } from "react-bootstrap";
import MyOrderChild from "./MyOrderChild";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount } from "enzyme";
import { ClearCart, RemoveFromCart } from "../redux/action/cartAction";


describe("Given Cart comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatch = jest.fn();

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
                }]
              },
            users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
            restaurants: { restaurantsList: [], isLoading: false, error: "" },
        })

        wrapper = mount(<Provider store={mockAppstore}>
            <MyOrderChild userorders={mockAppstore.getState().orders?.userorders}
            />
        </Provider>)
    });

    it("should render cart comp", () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('h6').text()).toEqual(`Total Price:${mockAppstore.getState().orders?.userorders[0].totalPrice}`)
        expect(wrapper.find('li').text()).toEqual(`Food Item:${mockAppstore.getState().orders?.userorders[0].foodItems}`)

    })

   
})