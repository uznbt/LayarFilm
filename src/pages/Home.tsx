import { Helmet } from "react-helmet-async";
import useSWR from "swr";
import { api } from "../services/api";
import { MovieCard } from "../components/movie/MovieCard";
import { PageLoader } from "../components/ui/PageLoader";
import { Play, Star, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: popularMovies, error: popularError } = useSWR("/popular/movies", () => api.getPopularMovies(1));
  const { data: latestMovies, error: latestError } = useSWR("/movies", () => api.getLatestMovies(1));
  const { data: latestSeries, error: seriesError } = useSWR("/series", () => api.getLatestSeries(1));

  if (popularError || latestError || seriesError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Oops! Gagal memuat data</h2>
        <p className="text-muted-foreground mb-6">Pastikan koneksi internet Anda stabil atau coba lagi nanti.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!popularMovies || !latestMovies || !latestSeries) {
    return <PageLoader />;
  }

  const featuredMovie = popularMovies.data?.[0];
  const otherPopular = popularMovies.data?.slice(1, 7) || [];
  const latestMovieList = latestMovies.data || [];
  const latestSeriesList = latestSeries.data || [];

  return (
    <div className="flex flex-col gap-12 pb-12">
      <Helmet>
        <title>Beranda | MYMovie - Streaming Film & Series Gratis</title>
        <meta name="description" content="Nonton film dan serial TV streaming gratis terbaru dengan kualitas terbaik hanya di MYMovie." />
      </Helmet>

      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative w-full aspect-[21/9] min-h-[400px] max-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={featuredMovie.poster} 
              alt={featuredMovie.title}
              className="w-full h-full object-cover object-top scale-105 brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="container relative h-full flex flex-col justify-end pb-12 gap-6">
            <div className="flex flex-col gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-widest">
                  Trending Now
                </span>
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold text-white">{featuredMovie.rating || "N/A"}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                {featuredMovie.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredMovie.year}
                </span>
                <span className="px-2 py-0.5 border border-white/20 rounded uppercase text-[10px]">
                  {featuredMovie.type === 'movie' ? 'Movie' : 'Series'}
                </span>
                <span className="flex items-center gap-1 border-l border-white/20 pl-4 uppercase">
                  {featuredMovie.quality}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Link 
                  to={`/detail/${featuredMovie.type}/${featuredMovie.slug}`}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Nonton Sekarang
                </Link>
                <Link
                  to={`/detail/${featuredMovie.type}/${featuredMovie.slug}`}
                  className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold border border-white/10 hover:bg-white/20 transition-all shadow-xl shadow-black/20"
                >
                  Detail Info
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Movies */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            Film Populer
          </h2>
          <Link to="/search?type=movie" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {otherPopular.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </div>
      </section>

      {/* Latest Movies */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            Film Terbaru
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {latestMovieList.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </div>
      </section>

      {/* Latest Series */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            Serial Terbaru
          </h2>
          <Link to="/search?type=series" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {latestSeriesList.map((movie) => (
            <MovieCard key={movie.slug} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
