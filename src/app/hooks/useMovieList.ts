import { useState, useEffect } from 'react';
import { MovieResponse } from '../types/movie';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/**
 * 現在上映中の映画一覧を取得するカスタムフック
 * @returns
 * - movieList: 現在上映中の映画一覧
 * - hasMore: まだデータがあるかどうか
 * - fetchMoreData: データを追加で取得する関数
 */
export const useMovieList = () => {
  const [movieList, setMovieList] = useState<MovieResponse[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = async (page: number) => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ja-JP&region=JP&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchMovies(1)
      .then((data) => {
        setMovieList(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
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

      const data = await fetchMovies(nextPage);
      setMovieList((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  return { movieList, hasMore, fetchMoreData };
};