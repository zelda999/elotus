import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ListResponse } from 'utils/types';
import {
  ConfigResponse,
  DetailMovieResponse,
  ListMoviesResponse,
} from './movieTypes';

export interface IMovieState {
  listMovies: ListMoviesResponse[];
  isLoading: boolean;
  config: ConfigResponse;
  pageCurrent: number;
  totalResults: number;
  detailMovie: DetailMovieResponse;
  isSearch: boolean;
}

const initialState: IMovieState = {
  listMovies: [],
  isLoading: false,
  config: {
    images: {
      base_url: '',
    },
  },
  pageCurrent: 1,
  totalResults: 0,
  detailMovie: {
    original_title: '',
    title: '',
    tagline: '',
    overview: '',
    poster_path: '',
    release_date: '',
    backdrop_path: '',
    genres: [],
    runtime: 0,
    production_companies: [],
  },
  isSearch: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    fetchConfig: (state) => {
      state.isLoading = true;
    },
    fetchConfigSuccess: (state, action: PayloadAction<ConfigResponse>) => {
      state.isLoading = false;
      state.config = {
        images: {
          base_url: action.payload.images.base_url,
        },
      };
    },
    fetchConfigFail: (state) => {
      state.isLoading = false;
    },
    fetchListMovies: (
      state,
      _action: PayloadAction<{ type: string; page?: number }>
    ) => {
      state.isLoading = true;
      state.isSearch = false;
    },
    fetchListMoviesSuccess: (
      state,
      action: PayloadAction<ListResponse<ListMoviesResponse>>
    ) => {
      state.isLoading = false;
      state.listMovies = action.payload.results;
      state.totalResults = action.payload.total_results ?? 0;
      state.isSearch = false;
    },
    fetchListMoviesFail: (state) => {
      state.isLoading = false;
      state.isSearch = false;
    },
    fetchDetailMovie: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchDetailMovieSuccess: (
      state,
      action: PayloadAction<DetailMovieResponse>
    ) => {
      state.isLoading = false;
      state.detailMovie = action.payload;
    },
    fetchDetailMovieFail: (state) => {
      state.isLoading = false;
    },
    searchMovie: (
      state,
      _action: PayloadAction<{
        searchText: string;
        typeMovie: string;
        page?: number;
      }>
    ) => {
      state.isLoading = true;
      state.isSearch = true;
    },
    searchMovieSuccess: (
      state,
      action: PayloadAction<ListResponse<ListMoviesResponse>>
    ) => {
      state.isLoading = false;
      state.listMovies = action.payload.results;
      state.totalResults = action.payload.total_results ?? 0;
      state.isSearch = true;
    },
    searchMovieFail: (state) => {
      state.isLoading = false;
      state.isSearch = false;
    },
    resetSearch: (state) => {
      state.isSearch = false;
      state.pageCurrent = 1;
    },
  },
});

// Actions
export const movieActions = movieSlice.actions;

export const selectConfigImg = (state: RootState) => state.movie.config;
export const selectListMovies = (state: RootState) => state.movie.listMovies;
export const selectLoading = (state: RootState) => state.movie.isLoading;
export const selectPageCurrent = (state: RootState) => state.movie.pageCurrent;
export const selectTotalResults = (state: RootState) =>
  state.movie.totalResults;
export const selectDetailMovie = (state: RootState) => state.movie.detailMovie;
export const selectIsSearch = (state: RootState) => state.movie.isSearch;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;
