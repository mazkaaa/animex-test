import { IAnimeResponse, IQuery, IResponse, IResponses } from "../../types";

export const AnimeService = () => {
  const base_url = "https://api.jikan.moe/v4/anime";

  const getAnimeList = async (query: IQuery) => {
    const { page = 1, limit = 10, q } = query;
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (q) {
      params.append("q", q);
    }
    const response = await fetch(base_url + "?" + params.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: IResponses<IAnimeResponse> = await response.json();
    return data;
  };

  const getAnimeById = async (id: string) => {
    const response = await fetch(`${base_url}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: IResponse<IAnimeResponse> = await response.json();
    return data;
  };

  return {
    getAnimeList,
    getAnimeById,
  };
};
