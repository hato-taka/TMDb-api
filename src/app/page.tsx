"use client";

import { use, useEffect, useState } from "react";
import { Item } from "./components/Item";


export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // .env.local ファイルに TMDB API キーを保存
  const BASE_URL = "https://api.themoviedb.org/3";

  type MovieResponse = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
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

  const [movieInfo, setMovieInfo] = useState<MovieResponse[]>([]);

  useEffect(() => {
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ja-JP&region=JP&page=1`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // 取得したJSONデータの処理
        setMovieInfo(data.results);
      })
      .catch((error) => {
        // エラー発生時の処理
        console.log("error");
      });
  }, []);

  return (
    <div>
      <ul className="flex flex-wrap w-[720px] mx-auto my-5 max-w-full">
        {movieInfo.map((movie) => {
          return (
            <li key={movie.id} className="w-1/3 p-2">
              <Item titleName={movie.title} imgPath={movie.poster_path} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
