// sagas.js
import { takeEvery, put } from 'redux-saga/effects';

function* mySaga() {
  yield takeEvery('ACTION_TYPE', function* (action) {
    // 处理action
    yield put({ type: 'INCREMENT_NUM', payload: 2 });
  });
}

export default mySaga;
