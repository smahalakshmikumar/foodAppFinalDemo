import { Button } from "react-bootstrap";
import Wishlist from "./Wishlist";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount, shallow } from "enzyme";
import { Router } from "react-router-dom";
import WishlistChild from "./WishlistChild";
import useStore from "../../components/custom-hooks/useStore"

jest.mock('../../components/custom-hooks/useStore')
describe("Given Wishlist comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatcher = jest.fn();
    let mockHistory={push:jest.fn(),listen:jest.fn(),location:{}}

    beforeEach(() => {
        //customHook
        useStore.mockReturnValue({
            state:{wishlist:[{
                id: 6,
                "hotelName": "Vaa Bro",
                "rating": "4",
                "genre": "juice,snacks",
                "type": "JUICES",
                "food": "pineapple juice",
                "cost": 200,
                "resImage": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/jqxlnlswe1vbbmc9mo9r"
              }]},
            dispatcher
        })
        //redux
        mockAppstore = createStore(rootReducer, {
            users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
        })

        wrapper = mount(
           <Router history={mockHistory}>
           <Provider store={mockAppstore}>
            <Wishlist/>
           </Provider> 
        </Router>)
    });

    it("should render wishList comp", () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.containsMatchingElement(<WishlistChild/>)).toEqual(true) 
    })
    
    
})