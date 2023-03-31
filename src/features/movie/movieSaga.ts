import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ListResponse } from 'utils/types';
import MovieService from './movieService';
import { movieActions } from './movieSlice';
import {
  ConfigResponse,
  DetailMovieResponse,
  ListMoviesResponse,
} from './movieTypes';

const {
  fetchConfigSuccess,
  fetchConfig,
  fetchConfigFail,
  fetchListMovies,
  fetchListMoviesSuccess,
  fetchListMoviesFail,
  fetchDetailMovie,
  fetchDetailMovieFail,
  fetchDetailMovieSuccess,
  searchMovie,
  searchMovieFail,
  searchMovieSuccess,
} = movieActions;

export function* fetchConfigSaga() {
  try {
    const result: ConfigResponse = yield call(MovieService.getConfig);
    yield put(fetchConfigSuccess(result));
  } catch (err) {
    const error = err as AxiosError;
    notification.error({
      message: error?.message,
      placement: 'bottomRight',
      duration: 2.5,
    });
    yield put(fetchConfigFail());
  }
}

export function* fetchListMoviesSaga(
  action: PayloadAction<{ type: string; page: number }>
) {
  try {
    const result: ListResponse<ListMoviesResponse> = yield call(
      MovieService.getListMovies,
      action.payload.type,
      action.payload.page
    );
    yield put(fetchListMoviesSuccess(result));
  } catch (err) {
    const error = err as AxiosError;
    notification.error({
      message: error?.message,
      placement: 'bottomRight',
      duration: 2.5,
    });
    yield put(fetchListMoviesFail());
  }
}

export function* searchMoviesSaga(
  action: PayloadAction<{
    searchText: string;
    typeMovie: string;
    page: number | 1;
  }>
) {
  try {
    const result: ListResponse<ListMoviesResponse> = action.payload.searchText
      ? yield call(
          MovieService.searchMovie,
          action.payload.searchText,
          action.payload.page
        )
      : yield call(
          MovieService.getListMovies,
          action.payload.typeMovie,
          action.payload.page
        );
    yield put(searchMovieSuccess(result));
    if (!action.payload.searchText) yield put(movieActions.resetSearch());
  } catch (err) {
    const error = err as AxiosError;
    notification.error({
      message: error?.message,
      placement: 'bottomRight',
      duration: 2.5,
    });
    yield put(searchMovieFail());
  }
}

export function* fetchDetailMovieSaga(action: PayloadAction<string>) {
  try {
    const result: DetailMovieResponse = yield call(
      MovieService.getDetailMovie,
      action.payload
    );
    yield put(fetchDetailMovieSuccess(result));
  } catch (err) {
    const error = err as AxiosError;
    notification.error({
      message: error?.message,
      placement: 'bottomRight',
      duration: 2.5,
    });
    yield put(fetchDetailMovieFail());
  }
}

export default function* movieSaga() {
  yield takeLatest(fetchConfig.type, fetchConfigSaga);
  yield takeLatest(fetchListMovies.type, fetchListMoviesSaga);
  yield takeLatest(fetchDetailMovie.type, fetchDetailMovieSaga);
  yield takeLatest(searchMovie.type, searchMoviesSaga);
}
