import Image from "next/image";

type ItemProps = {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  };
};

export const Item = ({ movie }: ItemProps) => {
  return (
    <>
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded w-full object-cover"
          unoptimized
        />
        <div className="absolute bottom-2 left-2 bg-green-700 text-white px-2 py-1 rounded-full text-sm font-bold">
          {Math.round(movie.vote_average * 10)}%
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
    </>
  );
};
