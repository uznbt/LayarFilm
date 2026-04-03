import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Film, Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Halaman Tidak Ditemukan | MYMovie</title>
      </Helmet>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <Film className="h-24 w-24 text-muted-foreground opacity-20" />
          <span className="absolute inset-0 flex items-center justify-center text-5xl font-black">404</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Halaman Hilang di Galaksi Lain</h1>
          <p className="text-muted-foreground max-w-sm">
            Sepertinya film yang Anda cari sudah dihapus atau URL-nya salah ketik.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/">
            <Button variant="primary" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>
    </>
  );
}
