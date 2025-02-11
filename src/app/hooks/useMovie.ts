import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useMovie = () => {
  const [movieInfo, setMovieInfo] = useState<MovieResponse | null>(null);

  const fetchMovie = async (id: number) => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ja-JP&region=JP`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchMovie(11216)
      .then((data) => {
        console.log(data);
        setMovieInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { movieInfo };
};
