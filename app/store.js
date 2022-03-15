import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import Router from 'next/router';

import sagas from './sagas';
import rootReducer from './rootReducer';
// import createSagaMonitor from "@clarketm/saga-monitor";

const initialState = null;
export const setInitialState = (state) => (initialState = state);

const checkRouter = (callback, times = 1) => {
  if(times > 30) {
    throw new Error('Timeout: router does not seem to be present.')
  }
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
    setTimeout(
      () => {
        const nextRouterIsReady = !!Router.router;
        nextRouterIsReady ? callback() : checkRouter(callback, times+1)
      },
      100
    );
  } else {
    callback();
  }
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['users'],
};


// const logger = (store) => (next) => (action) => {
//   console.log('-------DISPATCH: ', action);
//   return next(action);
// };


/*
const createSagaMiddlewarePayload = {
  sagaMonitor: createSagaMonitor({
    level: "log",
    effectTrigger: true,
    effectResolve: true,
    actionDispatch: true
  })
}*/

export const buildStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // const effectMiddleware = next => effect => {
  //   console.log('effect', effect);
  //   return next(effect);
  // }
  const sagaMiddleware = createSagaMiddleware({
    // effectMiddlewares: [effectMiddleware]
  });
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(sagaMiddleware)
        // .concat(logger),
  });
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  sagaMiddleware.setContext({ persistor });
  return store;
};
const store = buildStore();
export default store;

checkRouter(() => store.dispatch({ type: 'app/routerReady' })); // maybe we should move this to an app sage. This cause cyclic dependenci if inside the buildStore method
