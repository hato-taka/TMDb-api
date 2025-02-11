"use client";

import { Item } from "./components/Item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMovieList } from "./hooks/useMovieList";
// import SearchForm from "./components/SearchForm";

// TODO: コンポーネントの切り出し
export default function Home() {

  const { movieList, hasMore, fetchMoreData } = useMovieList();

  return (
    <div className="w-[720px] mx-auto my-5 max-w-full px-2">
      {/* <SearchForm /> */}
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
            <div key={movie.id} className="bg-gray-800 p-4 rounded flex">
              <Item movie={movie} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
