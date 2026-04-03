import React from "react";
import { Link } from "react-router-dom";
import { Film, Info, HelpCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 pb-32 md:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center gap-2 md:justify-start">
              <Film className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                MY<span className="text-primary">Movie</span>
              </span>
            </Link>
            <p className="max-w-[300px] text-xs text-muted-foreground leading-relaxed">
              Platform streaming film LK21 unofficial tercepat dan termudah. 
              Dibuat dengan ❤️ oleh Senior Frontend Engineer.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Info className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} MYMovie. Seluruh hak cipta dilindungi undang-undang. 
          Website ini hanya untuk tujuan edukasi.
        </div>
      </div>
    </footer>
  );
}
