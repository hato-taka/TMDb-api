import Image from "next/image";

type ItemProps = {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
  }
};

export const Item = ({ movie }: ItemProps) => {
  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        width={100}
        height={150}
        className="rounded"
        unoptimized
      />
      <div className="ml-4">
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
