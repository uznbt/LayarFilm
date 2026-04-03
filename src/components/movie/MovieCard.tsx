import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/detail/${movie.type}/${movie.slug}`}
      className="group relative flex flex-col gap-2 transition-all duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-7 w-7 fill-current" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded-md flex items-center gap-1 border border-white/10">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-white">{movie.rating || "N/A"}</span>
        </div>

        {/* Quality Badge */}
        {movie.quality && (
          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-primary/90 rounded text-[10px] font-bold text-white uppercase tracking-wider">
            {movie.quality}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {movie.year || "Release Year"}
        </p>
      </div>
    </Link>
  );
}
