import { call, spawn, all } from 'redux-saga/effects';
import { UserSaga } from './user/saga';
import { CountSaga } from './count/saga';

export function* rootSaga() {
  const sagas = [UserSaga, CountSaga];
  try {
    yield all(
      sagas.map((saga) =>
        spawn(function* () {
          while (true) {
            yield call(saga);
            break;
          }
        })
      )
    );
  } catch (e) {
    console.log(e);
  }
}
