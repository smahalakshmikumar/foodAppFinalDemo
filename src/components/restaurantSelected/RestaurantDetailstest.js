import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import RestaurantDetails from "./RestaurantDetails";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount } from "enzyme";
import { Button } from "react-bootstrap";
import useStore from "../../components/custom-hooks/useStore"
import React from "react";


jest.mock('../../components/custom-hooks/useStore')
describe("Given RestaurantDetails comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatcher = jest.fn();
    let handlerMock= jest.fn();

    beforeEach(() => {
        //customHook
        useStore.mockReturnValue({
            state:{wishlist:[{id:1}]},
            dispatcher
        })
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
        

        wrapper = mount(<Provider store={mockAppstore}>
            <RestaurantDetails 

            />
        </Provider>)
    });

    it("should render RestaurantDetails comp", () => {
        expect(wrapper).toHaveLength(1);   
    })

    // describe("SEE MORE test case", () => {
       
    //     it("show see more buton and perform click", () => {
    //       const seeMoreButton=wrapper.find('#seeMore');
    //      seeMoreButton.at(0).simulate('click');
    //      wrapper.update();
    //      expect(wrapper.find('#restaurantDetails')).toHaveLength(1);
    //     })
    // })


   
})