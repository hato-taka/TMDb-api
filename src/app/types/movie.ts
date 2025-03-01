// types/movie.ts
// TODO: id と movieId はどう違うのか
// id: データベースの ID(UUID)
// movieId: TMDB API の ID
export interface Movie {
  id: string;
  movieId: string;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
}

export interface SearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export type MovieResponse = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // YYYY-MM-DD format
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};