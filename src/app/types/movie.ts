// types/movie.ts
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
}

export interface SearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}
