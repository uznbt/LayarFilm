import React from "react";
import { Outlet } from "react-router-dom";
import { NavbarDesktop } from "../components/layout/NavbarDesktop";
import { NavbarMobile } from "../components/layout/NavbarMobile";
import { Footer } from "../components/layout/Footer";

export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <NavbarDesktop />
      <NavbarMobile />
      
      <main className="container mx-auto px-4 py-8 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
