import Image from "next/image";
import { Heart, Plus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import axios from "axios";

// TODO: src/app/types/movie.ts で型定義をする
type ItemProps = {
  movie: Movie;
  hasAddButton?: boolean;
};

export const Item = ({ movie, hasAddButton = false }: ItemProps) => {
  const [liked, setLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  // TODO: likeCountをAPIから取得する
  const [likeCount, setLikeCount] = useState(movie.likes);

  // ローカルストレージから「いいね」の状態を取得
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    if (storedLikes[movie.movieId]) {
      setLiked(true);
      setLikeCount(storedLikes[movie.movieId]);
    }
  }, [movie.movieId]);

  // いいねの切り替え
  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

    // ローカルストレージに保存 → todo: APIに保存する
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    storedLikes[movie.movieId] = newLiked ? likeCount + 1 : likeCount - 1;
    localStorage.setItem("likes", JSON.stringify(storedLikes));

    updateMovie(movie.id, likeCount);
  };

  // TODO: hooksに移動させる
  const postMovie = async (movieId: string, title: string) => {
    try {
      const response = await axios.post("/api/movies", {
        id: crypto.randomUUID(),
        movieId: movieId.toString(),
        title,
      });
      setIsAdded(true);
      console.log("投稿成功:", response);
    } catch (error) {
      console.error("投稿エラー:", error);
    }
  };

  const updateMovie = async (id: string, likes: number) => {
    console.log(id, likes);
    try {
      const response = await axios.put("/api/movies", {
        id: id.toString(),
        movieId: movie.movieId.toString(),
        likes,
      });
      console.log("更新成功:", response);
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  return (
    <>
      <div key={movie.id} className="bg-gray-800 p-4 rounded flex">
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="rounded w-full object-cover"
            unoptimized
          />
          <div className="flex gap-2 ">
            {/* いいねボタン */}
            {!hasAddButton && (
              <button
                onClick={toggleLike}
                className="flex items-center gap-2 p-2 border rounded-lg shadow-md mt-3 bg-gray-800"
              >
                <Heart
                  size={20}
                  className={
                    liked ? "text-red-500 fill-red-500" : "text-gray-500"
                  }
                />
                <span>{likeCount}</span>
              </button>
            )}
            {hasAddButton && (
              <button
                className={`items-center gap-2 p-2 border rounded-lg shadow-md mt-3 ${
                  isAdded ? "bg-red-500" : "bg-gray-800"
                }`}
                onClick={() => {
                  postMovie(movie.id, movie.title);
                }}
              >
                {isAdded ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="ml-4 w-full">
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.overview?.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </>
  );
};
