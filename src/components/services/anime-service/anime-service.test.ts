import { AnimeService } from "./anime-service";

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
  global.fetch = originalFetch;
});

describe("AnimeService", () => {
  const service = AnimeService();

  describe("getAnimeList", () => {
    it("should call fetch with correct URL and options when query parameters are provided", async () => {
      const fakeData = { data: [{ id: "1", title: "Test Anime" }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(fakeData),
      });

      const query = { page: 2, limit: 5, q: "naruto" };
      const result = await service.getAnimeList(query);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const expectedUrl =
        "https://api.jikan.moe/v4/anime?page=2&limit=5&q=naruto";
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "force-cache",
      });
      expect(result).toEqual(fakeData);
    });

    it("should omit query parameter 'q' when not provided", async () => {
      const fakeData = { data: [{ id: "2", title: "Borutoo" }] };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(fakeData),
      });

      const query = { page: 1, limit: 10 };
      const result = await service.getAnimeList(query);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const expectedUrl = "https://api.jikan.moe/v4/anime?page=1&limit=10";
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "force-cache",
      });
      expect(result).toEqual(fakeData);
    });

    it("should throw an error if the fetch response is not ok", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      const query = { page: 1, limit: 10 };
      await expect(service.getAnimeList(query)).rejects.toThrow(
        "Failed to fetch data",
      );
    });
  });

  describe("getAnimeById", () => {
    it("should call fetch with correct URL and return data when response is ok", async () => {
      const fakeData = { data: { id: "123", title: "HunterxHunter" } };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(fakeData),
      });

      const id = "123";
      const result = await service.getAnimeById(id);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const expectedUrl = `https://api.jikan.moe/v4/anime/${id}`;
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(result).toEqual(fakeData);
    });

    it("should throw an error if the fetch response is not ok", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      const id = "456";
      await expect(service.getAnimeById(id)).rejects.toThrow(
        "Failed to fetch data",
      );
    });
  });
});
