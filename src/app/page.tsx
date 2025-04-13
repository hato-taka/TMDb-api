"use client";

import { Item } from "./components/Item";
import { useMovieList } from "./hooks/useMovieList";
import { useMovie } from "./hooks/useMovie";
import SearchForm from "./components/SearchForm";

export default function Home() {
  const { movieList } = useMovieList();
  // TODO: isLoading の状態を追加する
  const { movieInfoList } = useMovie();
  // likes の降順で並び替え
  const sortedMovieInfoList = [...movieInfoList].sort((a, b) => {
    if (a.likes === undefined || b.likes === undefined) return 1;
    return b.likes - a.likes;
  });

  return (
    <div className="w-[720px] mx-auto my-5 max-w-full px-2">
      <h1 className="text-2xl font-bold my-4">作品検索</h1>
      <SearchForm />

      <h1 className="text-2xl font-bold my-4">リクエスト作品</h1>
      {/* <div className="flex gap-4 mt-4 max-w-full overflow-x-scroll overflow-y-hidden"> */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {sortedMovieInfoList.map((movie, index) => (
          <Item
            movie={{
              ...movie,
              movieId: movie.movieId,
              likes: movie.likes ?? 0,
            }}
            key={`${movie.id}${index}`}
          />
        ))}
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <h1 className="text-2xl font-bold mt-10">上映中作品</h1>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {movieList.map((movie) => (
            <Item
              movie={{ ...movie, movieId: movie.id, likes: 0 }}
              key={movie.id}
              hasAddButton={true}
            />
          ))}
        </div>
    </div>
  );
}
