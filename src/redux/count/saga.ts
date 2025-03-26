import { takeLatest, put, fork, call } from 'redux-saga/effects'
import { increment, update } from './'

const mockAsync = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100))
    }, 3000)
  })
function* incrementFetch(): any {
  try {
    const res = yield call(mockAsync)
    yield put(update(res))
  } catch (error) {
    console.log(error)
  }
}

function* watchIncrement() {
  yield takeLatest(increment, incrementFetch)
}

export function* CountSaga() {
  yield fork(watchIncrement)
}
