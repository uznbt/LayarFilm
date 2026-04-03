import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Clock, X, Film, Tv } from "lucide-react";
import { Input } from "../ui/Input";
import { cn } from "../../utils/cn";

export function NavbarMobile() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const navItems = [
    { label: "Beranda", icon: Home, path: "/" },
    { label: "Film", icon: Film, path: "/search?filter=trending" },
    { label: "Serial TV", icon: Tv, path: "/search?filter=popular" },
    { label: "Riwayat", icon: Clock, path: "/history" },
  ];

  return (
    <div className="md:hidden">
      {/* Top bar - Solid #09090B as requested */}
      <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border bg-background px-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">MY<span className="text-primary">M</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-1 text-muted-foreground hover:text-primary"
          >
            {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <div className="h-8 w-8 rounded-full bg-secondary border border-border overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay - Solid background as requested */}
      {showSearch && (
        <div className="fixed inset-x-0 top-14 z-40 bg-background border-b border-border p-4 animate-in fade-in duration-200">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari film..."
              className="pr-10"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Bottom Navigation - Solid background as requested */}
      <nav className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around border-t border-border bg-background px-2 pb-safe shadow-lg shadow-black">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 p-2 text-[10px] font-medium transition-colors",
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="h-16" /> {/* Spacer for bottom nav */}
    </div>
  );
}
