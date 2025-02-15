import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movie";
// import wishListJson from "../movies.json";
// import { useWishList } from "./useWishList";
import { WishList } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// const ids = wishListJson.map((movie) => movie.id);

export const useMovie = () => {
  const [movieInfoList, setMovieInfoList] = useState<MovieResponse[]>([]);
  const [wishList, setWishList] = useState<WishList[]>([]);


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

  const fetchWishList = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWishList(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("fetch movies done");
    }
  };

  useEffect(() => {
    fetchWishList();
    console.log(wishList);

    const ids = wishList.map((movie) => movie.id);
    ids.forEach(async (id) => {
      fetchMovie(id)
        .then((data) => {
          // console.log(data);
          setMovieInfoList((prev) => [...prev, data]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return { movieInfoList };
};
