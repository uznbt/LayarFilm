import type { ApiResponse, Movie, MovieDetail } from "../types";
import { mapMovie, mapMovieDetail } from "../utils/mapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Helper for fetching
const fetcher = async (url: string) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const api = {
  getLatestMovies: async (page: number = 1): Promise<ApiResponse<Movie[]>> => {
    const res = await fetcher(`/movies?page=${page}`);
    // lk21-api returns a plain array, not { data: [] }
    const arr = Array.isArray(res) ? res : (res.data || []);
    return { data: arr.map((m: any) => mapMovie(m, 'movie')) };
  },
  
  getPopularMovies: async (page: number = 1): Promise<ApiResponse<Movie[]>> => {
    const res = await fetcher(`/popular/movies?page=${page}`);
    const arr = Array.isArray(res) ? res : (res.data || []);
    return { data: arr.map((m: any) => mapMovie(m, 'movie')) };
  },

  getLatestSeries: async (page: number = 1): Promise<ApiResponse<Movie[]>> => {
    const res = await fetcher(`/series?page=${page}`);
    const arr = Array.isArray(res) ? res : (res.data || []);
    return { data: arr.map((m: any) => mapMovie(m, 'series')) };
  },

  getPopularSeries: async (page: number = 1): Promise<ApiResponse<Movie[]>> => {
    const res = await fetcher(`/popular/series?page=${page}`);
    const arr = Array.isArray(res) ? res : (res.data || []);
    return { data: arr.map((m: any) => mapMovie(m, 'series')) };
  },
  
  search: async (query: string): Promise<ApiResponse<Movie[]>> => {
    const res = await fetcher(`/search/${encodeURIComponent(query)}`);
    const arr = Array.isArray(res) ? res : (res.data || []);
    return { data: arr.map((m: any) => mapMovie(m, m.type === 'series' ? 'series' : 'movie')) };
  },
  
  getDetail: async (id: string, type: 'movie' | 'series'): Promise<ApiResponse<MovieDetail>> => {
    const endpoint = type === 'movie' ? `/movies/${id}` : `/series/${id}`;
    const res = await fetcher(endpoint);
    const raw = Array.isArray(res) ? res[0] : res;
    return { data: mapMovieDetail(raw, type) };
  }
};

export default fetcher;
