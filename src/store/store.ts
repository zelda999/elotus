import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import movieSaga from 'features/movie/movieSaga';
import movieReducer from 'features/movie/movieSlice';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  movie: movieReducer, // create authSlice after import into
});

export function* rootSaga(): Generator<unknown, void, unknown> {
  yield all([movieSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
