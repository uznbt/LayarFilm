export interface Movie {
  title: string;
  slug: string; // mapped from movieId or seriesId
  poster: string;
  rating: string;
  quality: string;
  year: string;
  type: 'movie' | 'series';
}

export interface StreamingLink {
  host: string;
  url: string;
}

export interface MovieDetail extends Movie {
  synopsis: string;
  directors: string;
  casts: string[];
  genres: string[];
  streamingLinks: StreamingLink[];
  recommendations: Movie[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  total_data?: number;
  total_page?: number;
  current_page?: number;
}

export const VERSION = "1.0.0";
