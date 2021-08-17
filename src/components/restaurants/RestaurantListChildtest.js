import TestRenderer from "react-test-renderer"
import { create, act } from 'react-test-renderer';
import { Button } from "react-bootstrap";
import RestaurantsListChild from "./RestaurantsListChild";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount } from "enzyme";
import { Router } from "react-router-dom";
import { FETCH_SAGA_SUCCESS_RESTAURANTLIST } from "../redux/action/actionTypes";


describe("Given Cart comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatch = jest.fn();
    let onRestaurantClicked=jest.fn();
    let removeRestaurant=jest.fn();
    let mockHistory={push:jest.fn(),listen:jest.fn(),location:{}}
    describe("when normal user role",()=>{
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
                  users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "user" }], isLoading: false },
    
            })
    
            wrapper = mount(
            <Router history={mockHistory}>
            <Provider store={mockAppstore}>
                <RestaurantsListChild restaurantsList={mockAppstore.getState().restaurants?.restaurantsList}
                onRestaurantClicked={onRestaurantClicked}
                removeRestaurant={removeRestaurant} dispatch={dispatch}/>
            </Provider>
            </Router>)
        });
    
        it("should render restaurantListChild comp", () => {
            expect(wrapper).toHaveLength(1);
        })
       
        describe('when "viewMoreButton" is clicked', () => {
            it("should callOnRestaurantClicked function to view more details", () => {
                
                expect(wrapper.find(Button).find('#viewMoreButton').find('button').text()).toEqual("View more")
                const viewMoreButton = wrapper.find(Button).find('#viewMoreButton').
                    find('button');
                    viewMoreButton.simulate('click');
                expect(onRestaurantClicked).toHaveBeenCalled();
                expect(onRestaurantClicked).toHaveBeenCalledWith(mockAppstore.getState().restaurants?.restaurantsList[0].id);
             })
        })

        describe('when "fetchSagaRestaurants" is clicked', () => {
            it("should dispatch fetchSagaRestaurants action", () => {
                
                expect(wrapper.find(Button).find('#fetchSagaRestaurants').find('button').text()).toEqual("Display Restaurants by saga")
                const fetchSagaRestaurantsButton = wrapper.find(Button).find('#fetchSagaRestaurants').
                    find('button');
                    fetchSagaRestaurantsButton.simulate('click');
                expect(dispatch).toHaveBeenCalled();
                expect(dispatch).toHaveBeenCalledWith({ type: FETCH_SAGA_SUCCESS_RESTAURANTLIST});
             })
        })
    })
    



    describe("when admin role",()=>{
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
                <RestaurantsListChild role={"admin"}
                restaurantsList={mockAppstore.getState().restaurants?.restaurantsList}
                onRestaurantClicked={onRestaurantClicked}
                removeRestaurant={removeRestaurant} dispatch={dispatch} history={mockHistory}/>
            </Provider>
            </Router>)
        });
    
        it("should render restaurantListChild comp", () => {
            expect(wrapper).toHaveLength(1);
            console.log("admin", wrapper.debug());    
      
        })
        describe('when "role" is admin', () => {
            describe("remove restaurant action",()=>{
                it("should be able to remove restaurant", () => {
                
                    expect(wrapper.find(Button).find('#removeRestaurant').find('button').text()).toEqual("Remove Restaurant")
                    const removeButton = wrapper.find(Button).find('#removeRestaurant').
                        find('button');
                        removeButton.simulate('click');
                    expect(removeRestaurant).toHaveBeenCalled();
                    expect(removeRestaurant).toHaveBeenCalledWith(mockAppstore.getState().restaurants?.restaurantsList[0].id);
                 })
            })

            describe("add restaurant action",()=>{
                it("should go to add restaurant page", () => {
                
                    expect(wrapper.find(Button).find('#addRestaurant').find('button').text()).toEqual("Add Restaurant")
                    const addButton = wrapper.find(Button).find('#addRestaurant').
                        find('button');
                        addButton.simulate('click');
                    expect(mockHistory.push).toHaveBeenCalled();
                    expect(mockHistory.push.mock.calls[0][0]).toEqual("/addRestaurant");

                 })
            })
           


        })
    })

   
   

})