type ItemProps = {
  titleName: string;
  imgPath: string;
};

export const Item = ({ titleName, imgPath }: ItemProps) => {
  return (
    <div className="item py-3">
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${imgPath}`}
        alt={titleName}
      />
      <p className="title mt-1 text-xl text-center font-semibold tracking-wide">{titleName}</p>
    </div>
  );
};
