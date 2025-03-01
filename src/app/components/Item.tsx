import Image from "next/image";
import { Heart, Plus } from "lucide-react";
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
  const [likeCount, setLikeCount] = useState(0);

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
    storedLikes[movie.id] = newLiked ? likeCount + 1 : likeCount - 1;
    localStorage.setItem("likes", JSON.stringify(storedLikes));
  };

  const postMovie = async (movieId: string, title: string) => {
    console.log(movieId, title);
    console.log(typeof movieId);
    try {
      const response = await axios.post("/api/movies", {
        id: crypto.randomUUID(),
        movieId: movieId.toString(),
        title,
      });
      setIsAdded(true);
      console.log(response.data);
    } catch (error) {
      console.error("投稿エラー:", error);
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
            {hasAddButton && (
              <button
                className={`items-center gap-2 p-2 border rounded-lg shadow-md mt-3 ${
                  isAdded ? "bg-red-500" : "bg-gray-800"
                }`}
                onClick={() => {
                  postMovie(movie.id, movie.title);
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <div className="ml-4 w-full">
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.overview.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </>
  );
};
