import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import RestaurantDetailsChild from "./RestaurantDetailsChild";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount } from "enzyme";
import { Button } from "react-bootstrap";
import useStore from "../../components/custom-hooks/useStore"
import {useState} from "react";
import React from "react";
import { Router } from "react-router-dom";


jest.mock('../../components/custom-hooks/useStore')
describe("Given RestaurantDetailsChild comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatcher = jest.fn();
    let handlerMock= jest.fn();
    let addCart=jest.fn();
    let addtoWishlist=jest.fn();
    let dataSource;
    let mockHistory={push:jest.fn(),listen:jest.fn(),location:{}}

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
        dataSource= mockAppstore.getState().restaurants?.restaurantsList[0];


        wrapper = mount(
        <Router history={mockHistory}>
        <Provider store={mockAppstore}>
            <RestaurantDetailsChild     
            addCart={addCart}       
            restaurantdetails={mockAppstore.getState().restaurants?.restaurantsList}
            addtoWishlist={addtoWishlist}
            dataSource={mockAppstore.getState().restaurants?.restaurantsList[0]}
            />
        </Provider>
        </Router>)
    });

    it("should render restaurantdetailsChild comp and check values", () => {

       
        expect(wrapper).toHaveLength(1);
        
    })

    describe("addCart test case", () => {  
        it("check after click", () => {
        const addCartButton=wrapper.find('#addCart');
        addCartButton.at(0).simulate('click');
        expect(addCart).toHaveBeenCalled();
        expect(addCart).toHaveBeenLastCalledWith(dataSource);

        })
    })

    // describe("addToWishList test case", () => {  
    //     it("update UI after clicking wishlist", () => {
    //     console.log("bfore",wrapper.debug())
    //     expect(wrapper.find(Button).find('#addtoWishlist').find('button').text()).toEqual("Add items to wishlist");
    //    const wishButton=wrapper.find(Button).find('#addtoWishlist').find('button');
    //     //expect(wrapper.find(Button).find('#addtoWishlist').find('button').text().toEqual("Add items to wishlist"));
    //     wishButton.simulate('click');
    //     //wrapper.update();
    //     console.log("updated",wrapper.debug())
    //     // expect(addtoWishlist).toHaveBeenCalled();
    //     // expect(addtoWishlist).toHaveBeenLastCalledWith(dataSource);

    //     })
    // })


   
})