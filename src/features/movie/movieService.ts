import axios from 'axios';
import { API_KEY, API_URL } from 'utils/contants';
import { ListResponse } from 'utils/types';
import {
  ConfigResponse,
  DetailMovieResponse,
  ListMoviesResponse,
} from './movieTypes';

const MovieService = {
  getConfig: async (): Promise<ConfigResponse> => {
    const { data } = await axios.get(
      `${API_URL}/configuration?api_key=${API_KEY}`,
      {}
    );
    return data;
  },
  getListMovies: async (
    type: string,
    page?: number | 1
  ): Promise<ListResponse<ListMoviesResponse>> => {
    const { data } = await axios.get(
      `${API_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`,
      {}
    );
    return data;
  },
  getDetailMovie: async (movieId: string): Promise<DetailMovieResponse> => {
    const { data } = await axios.get(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY}`,
      {}
    );
    return data;
  },
  searchMovie: async (searchText: string, page?: number | 1): Promise<any> => {
    const { data } = await axios.get(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchText}&page=${page}`,
      {}
    );
    return data;
  },
};

export default MovieService;
