export interface ConfigResponse {
  images: {
    base_url: string;
  };
}

export interface ListMoviesResponse {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface DetailMovieResponse {
  original_title: string;
  overview: string;
  title: string;
  tagline: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  genres: {
    id: string;
    name: string;
  }[];
  runtime: number;
  production_companies: {
    id: string;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}
