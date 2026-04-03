import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useSWR from "swr";
import { api } from "../services/api";
import type { Movie } from "../types";
import { Helmet } from "react-helmet-async";
import { MovieCard } from "../components/movie/MovieCard";
import { PageLoader } from "../components/ui/PageLoader";
import { Search as SearchIcon, SlidersHorizontal, ArrowLeft } from "lucide-react";

type FilterType = "trending" | "popular" | "search";

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const filterParam = searchParams.get("filter") as FilterType || "search";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<FilterType>(filterParam);

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(initialQuery);
    setActiveFilter(filterParam);
  }, [initialQuery, filterParam]);

  const { data: results, error, isLoading } = useSWR(
    [activeFilter, searchQuery],
    () => {
      if (activeFilter === "trending") return api.getLatestMovies(1);
      if (activeFilter === "popular") return api.getPopularMovies(1);
      return api.search(searchQuery);
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveFilter("search");
    }
  };

  const pageTitle = activeFilter === "trending" 
    ? "Trending" 
    : activeFilter === "popular" 
    ? "Populer" 
    : `Pencarian: ${searchQuery}`;

  const renderContent = () => {
    if (isLoading) return <PageLoader />;
    
    if (error || !results?.data || results.data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Tidak ada hasil ditemukan</h3>
          <p className="text-muted-foreground max-w-xs">
            Coba gunakan kata kunci lain atau periksa filter yang Anda gunakan.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {results.data.map((item) => (
          <MovieCard key={item.slug} movie={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="pb-20 space-y-8">
      <Helmet>
        <title>{`${pageTitle} | MYMovie`}</title>
      </Helmet>

      {/* Header & Search Bar */}
      <section className="sticky top-0 z-40 bg-background border-b border-white/5 py-6">
        <div className="container space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white">{pageTitle}</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                {results?.total_data || 0} Film ditemukan
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative w-full md:max-w-md group">
              <input
                type="text"
                placeholder="Cari film, genre, atau aktor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-12 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </form>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveFilter("search")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeFilter === "search" 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter("popular")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeFilter === "popular" 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
              }`}
            >
              Populer
            </button>
            <button
              onClick={() => setActiveFilter("trending")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeFilter === "trending" 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
              }`}
            >
              Trending
            </button>
          </div>
        </div>
      </section>

      <section className="container">
        {renderContent()}
      </section>
    </div>
  );
}
