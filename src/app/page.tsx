"use client";

import { Item } from "./components/Item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMovieList } from "./hooks/useMovieList";
import { useMovie } from "./hooks/useMovie";
import SearchForm from "./components/SearchForm";
// import { useWishList } from "./hooks/useWishList";

export default function Home() {
  const { movieList, hasMore, fetchMoreData } = useMovieList();
  const { movieInfoList } = useMovie();
  // const { wishList } = useWishList();

  return (
    <div className="w-[720px] mx-auto my-5 max-w-full px-2">
      <h1 className="text-2xl font-bold my-4">作品検索</h1>
      <SearchForm />

      <h1 className="text-2xl font-bold my-4">リクエスト作品</h1>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="grid grid-cols-1 gap-4 mt-4">
          {movieInfoList.map((movie, index) => (
            <Item movie={{ ...movie, movieId: movie.movieId, likes: movie.likes ?? 0 }} key={`${movie.id}${index}`} />
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-bold my-4">上映中作品</h1>
      <InfiniteScroll
        dataLength={movieList.length} // 現在のアイテム数
        next={fetchMoreData} // 次のデータをロードする関数
        hasMore={hasMore} // まだデータがあるかどうか
        loader={<h4>Loading...</h4>} // ローディング中に表示される内容
        endMessage={
          <p className="text-center my-4">You have seen all the items!</p>
        } // 終了メッセージ
      >
        <div className="grid grid-cols-1 gap-4 mt-4">
          {movieList.map((movie) => (
            <Item movie={{ ...movie, movieId: movie.id, likes :0 }} key={movie.id} hasAddButton={true}/>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
