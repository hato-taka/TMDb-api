"use client";

import { useEffect, useState } from "react";
import { Item } from "./components/Item";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        // エラー発生時の処理
        console.log(error);
      });
  }, []);

  const fetchMoreData = async () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }

    try {
      const nextPage = page + 1;
      setPage(nextPage);

      const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ja-JP&region=JP&page=${nextPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // 取得したJSONデータの処理
      setMovieInfo((prevMovieInfo) => [...prevMovieInfo, ...data.results]);
    } catch (error) {
      // エラー発生時の処理
      console.error("Failed to fetch data:", error);
    }
  };


  return (
    <div>
        <InfiniteScroll
          dataLength={movieInfo.length} // 現在のアイテム数
          next={fetchMoreData} // 次のデータをロードする関数
          hasMore={hasMore} // まだデータがあるかどうか
          loader={<h4>Loading...</h4>} // ローディング中に表示される内容
          endMessage={
            <p className="text-center my-4">You have seen all the items!</p>
          } // 終了メッセージ
        >
      <ul className="flex flex-wrap w-[720px] mx-auto my-5 max-w-full">
          {movieInfo.map((movie) => {
            return (
              <li key={movie.id} className="w-1/3 p-2">
                <Item titleName={movie.title} imgPath={movie.poster_path} />
              </li>
            );
          })}
      </ul>
        </InfiniteScroll>
    </div>
  );
}
