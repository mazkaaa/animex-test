import Image from "next/image";
import { IAnimeResponse } from "../../types";

interface PROPS {
  data: IAnimeResponse;
}
export const AnimeCard = (props: PROPS) => {
  const { data } = props;
  return (
    <div
      data-testid="anime-card-container"
      className="rounded-md border border-zinc-300 shadow-md dark:border-zinc-700"
    >
      <div className="h-44 w-full md:h-96">
        <Image
          data-testid="anime-card-image"
          src={data.images["jpg"].image_url}
          alt={data.title}
          className="h-full w-full rounded-t-md object-cover"
          width={700}
          height={700}
        />
      </div>
      <div className="truncate px-2 py-2">
        <span className="text-sm font-semibold tracking-wide">
          {data.title}
        </span>
      </div>
    </div>
  );
};
