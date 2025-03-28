import { render, screen } from "@testing-library/react";
import { IAnimeResponse } from "../../types";
import { AnimeCard } from "./anime-card";

describe("AnimeCard Component", () => {
  const mockData: IAnimeResponse = {
    title: "Naruto",
    images: {
      jpg: {
        image_url: "https://example.com/naruto.jpg",
        small_image_url: "",
        large_image_url: "",
      },
    },
    mal_id: 0,
    url: "",
    trailer: {
      embed_url: "",
      url: "",
      youtube_id: "",
    },
    approved: false,
    titles: [],
    title_english: "",
    title_japanese: "",
    title_synonyms: [],
    type: "",
    source: "",
    episodes: 0,
    status: "",
    airing: false,
    aired: {
      from: "",
      prop: {
        from: {
          day: 0,
          month: 0,
          year: 0,
        },
        to: {
          day: 0,
          month: 0,
          year: 0,
        },
        string: "",
      },
      to: "",
    },
    duration: "",
    rating: "",
    score: 0,
    scored_by: 0,
    rank: 0,
    popularity: 0,
    members: 0,
    favorites: 0,
    synopsis: "",
    background: "",
    season: "",
    year: 0,
    broadcast: {
      day: "",
      string: "",
      time: "",
      timezone: "",
    },
    producers: [],
    licensors: [],
    studios: [],
    genres: [],
    explicit_genres: [],
    themes: [],
    demographics: [],
  };

  it("renders the anime title", () => {
    render(<AnimeCard data={mockData} />);
    const titleElement = screen.getByText("Naruto");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the anime image with correct src and alt attributes", () => {
    render(<AnimeCard data={mockData} />);
    const imageElement = screen.getByAltText("Naruto") as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(
      "http://localhost/_next/image?url=https%3A%2F%2Fexample.com%2Fnaruto.jpg&w=1920&q=75",
    );
    expect(imageElement.alt).toBe("Naruto");
  });

  it("applies the correct class names for styling", () => {
    render(<AnimeCard data={mockData} />);
    const containerElement = screen.getByTestId("anime-card-container");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass(
      "rounded-md border border-zinc-300 shadow-md dark:border-zinc-700",
    );
  });
});
