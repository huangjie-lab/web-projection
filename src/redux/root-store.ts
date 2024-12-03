// store.js 单个模块
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './root-reducer';
// import rootSaga from './root-saga';

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

export function getStore() {
  // 创建 saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // rootReducer中包含多个模块的reducer
  const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware] as any
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
