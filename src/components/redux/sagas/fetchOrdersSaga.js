import { getData} from "../../../api/api"
import { FETCH_SAGA_SUCCESS_ORDERS} from "../action/actionTypes"
import { call, put,takeLatest, cancelled, delay} from 'redux-saga/effects'
import axios from "axios";
import {fetchOrderSuccess,fetchFailure,setLoader} from "../action/orderAction"


/***
 * generator function order list saga //worker saga
 * @returns axios response
 */

export function* fetchOrdersWorkerSaga(action) {
   const CancelToken = axios.CancelToken;
   const source = CancelToken.source();
   try {
      yield put(setLoader(true));
      const response = yield call(getData,
          `users/${action.payload}?_embed=userorders`, 
      { cancelToken: source.token });
     // yield delay(5000)
      yield put(fetchOrderSuccess(response.data))
   }
   catch (err) {
      yield put(fetchFailure(err));

   } finally {
      yield put(setLoader(false));
      if (yield cancelled()) {
         //console.log("order saga cancelled")
         source.cancel();
      }
   }

}

/**
 * watcher saga
 * @returns FETCH_SAGA_SUCCESS_ORDERS
 */

export function* fetchOrdersWatcherSaga() {
yield takeLatest(FETCH_SAGA_SUCCESS_ORDERS, fetchOrdersWorkerSaga)
}

