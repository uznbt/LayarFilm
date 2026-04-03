import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { api } from "../services/api";
import type { Movie } from "../types";
import { Helmet } from "react-helmet-async";
import { VideoPlayer } from "../components/movie/VideoPlayer";
import { MovieCard } from "../components/movie/MovieCard";
import { PageLoader } from "../components/ui/PageLoader";
import { Star, Calendar, Clock, User, Film, Tag, ArrowLeft } from "lucide-react";

export default function Detail() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [selectedServer, setSelectedServer] = useState<string>("");

  const { data: movieRes, error, isLoading } = useSWR(
    id ? `/detail/${type}/${id}` : null,
    () => api.getDetail(id!, type as 'movie' | 'series')
  );

  if (error) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Gagal memuat film</h2>
        <Link to="/" className="text-primary hover:underline transition-all">Kembali ke Beranda</Link>
      </div>
    );
  }

  if (isLoading || !movieRes?.data) {
    return <PageLoader />;
  }

  const movie = movieRes.data;

  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <Helmet>
        <title>{`${movie.title} (${movie.year}) | MYMovie`}</title>
        <meta name="description" content={movie.synopsis} />
      </Helmet>

      {/* Header Back Button */}
      <div className="container py-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali
        </Link>
      </div>

      {/* Player Section */}
      <section className="container mb-12">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
          <VideoPlayer 
            source={movie.streamingLinks[0]?.url || ""} 
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="container grid lg:grid-cols-3 gap-12">
        {/* Left: Poster & Basic Meta */}
        <div className="lg:col-span-1 space-y-6">
          <div className="aspect-[2/3] w-full max-w-[300px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-lg font-bold text-white">{movie.rating || "N/A"}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Rating</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-white">{movie.year}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Release</span>
            </div>
          </div>
        </div>

        {/* Right: Content Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{movie.title}</h1>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <span key={genre} className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/20">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              Sinopsis
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {movie.synopsis || "Tidak ada sinopsis untuk film ini."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4" />
                Director & Cast
              </h4>
              <ul className="space-y-2 text-white">
                <li><span className="text-muted-foreground">Director:</span> {movie.directors}</li>
                <li><span className="text-muted-foreground">Cast:</span> {movie.casts.join(", ")}</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Detail Tag
              </h4>
              <ul className="space-y-2 text-white">
                <li><span className="text-muted-foreground">Quality:</span> <span className="uppercase text-primary font-bold">{movie.quality}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {movie.recommendations && movie.recommendations.length > 0 && (
        <section className="container mt-20 space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            Rekomendasi Film
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movie.recommendations.map((rec) => (
              <MovieCard key={rec.slug} movie={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
