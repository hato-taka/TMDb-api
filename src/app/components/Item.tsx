import Image from "next/image";
import { Heart, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Movie } from "../types/movie";
import axios from "axios";
import Link from "next/link";
import Modal from "./Modal";

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

  // ローカルストレージから「いいね」の状態を取得 → todo: 検討中
  // useEffect(() => {
  // const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
  // if (storedLikes[movie.movieId]) {
  //   setLiked(true);
  // }
  // }, [movie.movieId]);

  // いいねの切り替え
  const toggleLike = () => {
    const newLiked = !liked;
    const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLiked(newLiked);
    setLikeCount(newLikeCount);

    // ローカルストレージに保存 → todo: APIに保存する
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    storedLikes[movie.movieId] = newLiked;
    localStorage.setItem("likes", JSON.stringify(storedLikes));

    updateMovie(movie.id, newLikeCount);
  };

  // TODO: hooksに移動させる
  const postMovie = async (movieId: string, title: string) => {
    if (isAdded) {
      return;
    }

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/movies/${id}`);
      console.log("削除成功:", response);
      window.location.reload(); // ページをリロード
    } catch (error) {
      console.error("削除エラー:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div key={movie.id} className="bg-gray-800 p-4 rounded flex">
        <div className="relative">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "/no_image_tate.jpg"
            }
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
                  <div className="flex items-center">
                    <Check className="w-5 h-5" />
                    <p className="ml-1">追加済</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="w-5 h-5" />
                    <p className="ml-1">追加</p>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="ml-4 w-full">
          <h2 className="text-lg font-bold text-white">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.overview?.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview}
          </p>
          {movie.homepage && (
            <p className="mt-4 text-blue-400">
              <Link href={movie.homepage}>公式サイト</Link>
            </p>
          )}

          {/* 削除ボタン */}
          {!hasAddButton && (
            <div>
              <button
                className="text-gray-400 mr-0 ml-auto block"
                onClick={handleDeleteClick}
              >
                削除する
              </button>

              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={() => handleConfirmDelete(movie.id)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
