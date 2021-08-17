import { Button } from "react-bootstrap";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { mount, shallow } from "enzyme";
import WishlistChild from "./WishlistChild";
import useStore from "../../components/custom-hooks/useStore"

jest.mock('../../components/custom-hooks/useStore')
describe("Given wishlistChild comp", () => {
    let wrapper;
    let mockAppstore;
    let dispatcher= jest.fn();
    let clearWishlist = jest.fn();
    let removeFromWishlist= jest.fn();
    beforeEach(() => {
         //customHook
        useStore.mockReturnValue({
            state:{wishList:[{
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
           <Provider store={mockAppstore}>
            <WishlistChild clearWishlist={clearWishlist} 
             state={useStore().state}
             removeFromWishlist={removeFromWishlist}/>
           </Provider> 
        )
    });

    it("should render wishList comp", () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('#headerItem').text()).toEqual(useStore().state.wishList[0].hotelName)

    })
    
    describe("clearWishList test case", () => {
       
        it("should CallclearWishlist function", () => {
          const clearWishListButton=wrapper.find('#clearWishList');
          clearWishListButton.at(0).simulate('click');
          expect(clearWishlist).toHaveBeenCalled();
        })
    })

    describe("removeWishlist test case", () => {
       
        it("should removeWishlist function", () => {
          const removeWishlistButton=wrapper.find('#removeWishList');
          removeWishlistButton.at(0).simulate('click');
          expect(removeFromWishlist).toHaveBeenCalled();
          expect(removeFromWishlist).toHaveBeenLastCalledWith(6);

        })
    })
    
})

// describe("Given wishlistChild comp when wishlist is empty", () => {
//     let wrapper;
//     let mockAppstore;
//     let dispatcher= jest.fn();

//     beforeEach(() => {
//          //customHook
//         useStore.mockReturnValue({
//             state:{wishList:[]},
//             dispatcher
//         })
//         //redux
//         mockAppstore = createStore(rootReducer, {
//             users: { usersList: [{ "id": 1, "firstName": "Maha", "role": "admin" }], isLoading: false },
//         })

//         wrapper = mount(
//            <Provider store={mockAppstore}>
//             <WishlistChild 
//              state={useStore().state}
//             />
//            </Provider> 
//         )
//     });

//     it("should render wishList comp", () => {
//         expect(wrapper).toHaveLength(1);
//         console.log("hello",wrapper.debug())
//         expect(wrapper.find('h1').text()).toEqual("Add items to wishlist")

//     })
   

   
    
// })