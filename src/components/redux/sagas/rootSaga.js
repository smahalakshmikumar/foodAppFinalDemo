import { restaurantListWatcherSaga } from "./restaurantListSaga";
import {all} from 'redux-saga/effects'
import { fetchOrdersWatcherSaga } from "./fetchOrdersSaga";


/**
 * root saga to combine sagas
 */
export default function* rootSaga() {
    yield all([
    (restaurantListWatcherSaga()),
    (fetchOrdersWatcherSaga())
    ])
   
  }