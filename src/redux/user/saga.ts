import { takeLatest, put, fork } from 'redux-saga/effects'
import { update, setUserInfo, setUserPwd } from './'

// 需要有异步的行为才使用saga 同步的行为可以直接使用dispatch(update(args))
function* setUserInfoFetch({ payload }: any) {
  try {
    yield put(update(payload))
    if (payload.cb) {
      payload.cb(`收到了调用时传递的参数${payload.username}`)
    }
  } catch (error) {
    console.log(error)
  }
}
function* setUserPwdFetch({ payload }: any) {
  try {
    yield put(update({ password: payload }))
  } catch (error) {
    console.log(error)
  }
}

function* watchSetUserInfo() {
  yield takeLatest(setUserInfo, setUserInfoFetch)
  // setUserInfo这个action写成 模块+action也是可以的
  //   yield takeLatest('user/setUserInfo', setUserInfoFetch);
}

function* watchSetUserPwd() {
  yield takeLatest(setUserPwd, setUserPwdFetch)
}

export function* UserSaga() {
  yield fork(watchSetUserInfo)
  yield fork(watchSetUserPwd)
}
