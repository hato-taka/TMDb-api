import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie";
import { WishList } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useMovie = () => {
  const [movieInfoList, setMovieInfoList] = useState<MovieResponse[]>([]);

  const fetchMovie = async (id: string, movieId: string, likes: number) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ja-JP&region=JP`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.homepage);
    return {...data, id, movieId, likes};
  };

  // DBから取得したデータを格納する
  const fetchWishList = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const wishMovies = await response.json();

      const moviePromises = wishMovies.map((movie: WishList) => fetchMovie(movie.id, movie.movieId, movie.likes));
      const movies = await Promise.all(moviePromises);
      setMovieInfoList(movies);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("fetch movies done");
    }
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  return { movieInfoList };
};
