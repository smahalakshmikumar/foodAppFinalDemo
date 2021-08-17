import { getData} from "../../../api/api"
import { FETCH_SAGA_SUCCESS_RESTAURANTLIST} from "../action/actionTypes"
import { call, put,takeLatest, cancelled,take, delay,takeEvery} from 'redux-saga/effects'
import axios from "axios";
import { fetchSuccess, fetchFailure, setLoader } from "../action/restaurantsAction"
import {cancelWorkerSaga} from "./cancelReqSaga"
import {CANCEL_PREV_REQUESTS} from "../action/actionTypes"


/***
 * generator function restaurant list saga //worker saga
 * @returns axios response
 */
export function* restaurantListWorkerSaga() {
   const CancelToken = axios.CancelToken;
   const source = CancelToken.source();
   try {
      yield put(setLoader(true));
      const response = yield call(getData, "sagaRestaurantsList", { cancelToken: source.token });
      yield put(fetchSuccess(response.data))
   }
   catch (err) {
      yield put(fetchFailure(err));
   } 
   finally {
      yield put(setLoader(false));
      if (yield cancelled()) {
        source.cancel();

      }
   }
}

/**
 * watcher saga
 * @returns FETCH_SAGA_SUCCESS_RESTAURANTLIST
 */
export function* restaurantListWatcherSaga() {
   const workerTask= yield takeEvery(FETCH_SAGA_SUCCESS_RESTAURANTLIST, restaurantListWorkerSaga);
   yield takeLatest(CANCEL_PREV_REQUESTS,cancelWorkerSaga,workerTask)
}

