import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie";
import wishList from "../movies.json";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const ids = wishList.map((movie) => movie.id);

export const useMovie = () => {
  const [movieInfoList, setMovieInfoList] = useState<MovieResponse[]>([]);

  const fetchMovie = async (id: string) => {
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
    ids.forEach(async (id) => {
      fetchMovie(id)
        .then((data) => {
          console.log(data);
          setMovieInfoList((prev) => [...prev, data]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return { movieInfoList };
};
