import {takeLatest,cancel} from 'redux-saga/effects'

/***
 * generator function cancel worker saga
 * @returns cancel prev tasks running
 */

export function* cancelWorkerSaga(task) {
    yield cancel(task)
}



