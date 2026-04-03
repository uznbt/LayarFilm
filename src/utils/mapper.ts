import type { Movie, MovieDetail } from "../types";

// Example of mapping API response to local interfaces
// to ensure consistency and type safety.
export const mapMovie = (data: any, contentType: 'movie' | 'series' = 'movie'): Movie => {
  // lk21-api returns: _id, title, posterImg, rating, qualityResolution, type, url
  const slug = data._id || data.movieId || data.seriesId || data.slug || "";
  return {
    title: data.title || "",
    slug,
    poster: data.posterImg || data.poster || "",
    rating: data.rating || "N/A",
    quality: data.qualityResolution || data.quality || "HD",
    year: data.year || "",
    type: (data.type as 'movie' | 'series') || contentType,
  };
};


export const mapMovieDetail = (data: any, contentType: 'movie' | 'series'): MovieDetail => {
  return {
    ...mapMovie(data, contentType),
    synopsis: data.synopsis || "",
    genres: data.genres || [],
    directors: data.directors || "",
    casts: data.casts || [],
    streamingLinks: (data.streamingLinks || []).map((link: any) => ({
      host: link.host || "",
      url: link.url || "",
    })),
    recommendations: (data.recommendations || []).map((rec: any) => mapMovie(rec, contentType)),
  };
};
