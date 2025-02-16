import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

// TODO: src/app/types/movie.ts で型定義をする
type ItemProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  };
};

export const Item = ({ movie }: ItemProps) => {
  const [liked, setLiked] = useState(false);
  // TODO: likeCountをAPIから取得する
  const [likeCount, setLikeCount] = useState(0);

  // ローカルストレージから「いいね」の状態を取得
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    if (storedLikes[movie.id]) {
      setLiked(true);
      setLikeCount(storedLikes[movie.id]);
    }
  }, [movie.id]);

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

  return (
    <>
      <div key={movie.id} className="bg-gray-800 p-4 rounded flex">
        <div onClick={toggleLike} className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="rounded w-full object-cover"
            unoptimized
          />
          <button className="flex items-center gap-2 p-2 border rounded-lg shadow-md mt-3 bg-gray-800">
            <Heart
              size={20}
              className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
            />
            <span>{likeCount}</span>
          </button>
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
