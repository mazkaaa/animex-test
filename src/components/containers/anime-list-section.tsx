import Link from "next/link";
import { useMemo } from "react";
import { AnimeCard } from "../reusables";
import { IAnimeResponse } from "../types";

interface PROPS {
  data: IAnimeResponse[];
}
export const AnimeListSection = (props: PROPS) => {
  const { data } = props;

  const defineContent = useMemo(() => {
    if (!data || data.length === 0) {
      return <div className="">No Data Found :(</div>;
    }
    return data.map((item, index) => (
      <Link key={index} href={`/anime/${item.mal_id}`}>
        <AnimeCard data={item} />
      </Link>
    ));
  }, [data]);

  return (
    <section className="grid grid-cols-3 gap-4 md:grid-cols-6">
      {defineContent}
    </section>
  );
};
