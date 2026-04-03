import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Film, Tv, Clock, Star } from "lucide-react";
import type { Movie } from "../../types";
import { Input } from "../ui/Input";
import { cn } from "../../utils/cn";

export function NavbarDesktop() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 hidden w-full border-b border-border bg-background md:block">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Film className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              MY<span className="text-primary">Movie</span>
            </span>
          </Link>

            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Beranda
              </Link>
              <Link
                to="/search?filter=trending"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Film
              </Link>
              <Link
                to="/search?filter=popular"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Serial TV
              </Link>
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end px-8">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari film atau series..."
              className="pl-10 bg-secondary border-none"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/saved">
            <Clock className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          </Link>
          <div className="h-8 w-8 rounded-full bg-secondary border border-border overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
