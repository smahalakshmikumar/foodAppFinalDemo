import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import RestaurantChild from "./RestaurantChild";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount } from "enzyme";
import { Button } from "react-bootstrap";
import useStore from "../../components/custom-hooks/useStore"
import {useState} from "react";
import React from "react";


jest.mock('../../components/custom-hooks/useStore')
describe("Given RestaurantChild comp", () => {
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
            <RestaurantChild 
             dataSource={mockAppstore.getState().restaurants?.restaurantsList[0]}
            />
        </Provider>)
    });

    it("should render restaurant comp and check values", () => {

       
        let dataSource= mockAppstore.getState().restaurants?.restaurantsList[0];
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('h1').text()).toEqual(dataSource.hotelName)
        expect(wrapper.find('#header-card').text()).toEqual(dataSource.genre)
        expect(wrapper.find('#details-card').text()).toEqual(`${dataSource.food}:${dataSource.cost}`)
        expect(wrapper.find(Button).find('#seeMore').find('button').text()).toEqual("See More")

    })

    describe("SEE MORE test case", () => {
       
        it("show see more buton and perform click", () => {
          const seeMoreButton=wrapper.find('#seeMore');
         seeMoreButton.at(0).simulate('click');
         wrapper.update();
         expect(wrapper.find('#restaurantDetails')).toHaveLength(1);
        })
    })


   
})