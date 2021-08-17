import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import { Button } from "react-bootstrap";
import CartChild from "./CartChild";
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
            users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
            restaurants: { restaurantsList: [], isLoading: false, error: "" },
        })

        wrapper = mount(<Provider store={mockAppstore}>
            <CartChild cartList={mockAppstore.getState().cart?.cartList}
                totalPrice={mockAppstore.getState().cart?.cartList[0].totalPrice}
                dispatch={dispatch}  />
        </Provider>)
    });

    it("should render cart comp", () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('h4').text()).toEqual(mockAppstore.getState().cart?.cartList[0].hotelName)
        expect(wrapper.find('h5').text()).toEqual(`${mockAppstore.getState().cart?.cartList[0].food}:${mockAppstore.getState().cart?.cartList[0].cost}`)
        expect(wrapper.find(Button).find('.Remove').find('button').text()).toEqual("Remove from cart")
        expect(wrapper.find(Button).find('#clear-button').find('button').text()).toEqual("Clear Cart")
        expect(wrapper.find(Button).find('#confirm-button').find('button').text()).toEqual("Confirm order")

    })

    describe('when "remove button" is clicked', () => {

        it("should dispatch remove cart action", () => {
            const removeButton = wrapper.find(Button).find('.Remove').
                find('button');
            removeButton.simulate('click');
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(RemoveFromCart(mockAppstore.getState().cart?.cartList[0].id));
        })
    })

    describe('when "clear cart" is clicked', () => {

        it("should dispatch clear cart action", () => {
            const clearButton = wrapper.find(Button).find('#clear-button').
                find('button');
            clearButton.simulate('click');
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(ClearCart());
        })
    })

    describe('when "confirm cart" is clicked', () => {

        it("should dispatch confirm cart action", () => {
            let confirmButton= wrapper.find(Button).find('#confirm-button').
                find('button');
            //let confirmClick=jest.fn();
             let setOpen=jest.fn();
            confirmButton.simulate('click');
            //expect(setOpen).toHaveBeenCalledWith(true);
            //expect(confirmClick).toHaveBeenCalledWith(confirmClick(setOpen(true)));
        })
    })

    

    

    // it("should render cart comp",()=>{
    //     const { cartList } = mockStore?.cart?.cartList;
    //     let compTree =create(<Provider store={mockStore}>
    //         <CartChild cartList={cartList}/>
    //     </Provider>).toJSON();
    //     expect(compTree).toMatchSnapshot();
    // })
})