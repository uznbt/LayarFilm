import React from "react";
import { Search } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export function EmptyState({
  message = "Hasil tidak ditemukan",
  description = "Coba kata kunci lain atau periksa ejaan Anda.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 rounded-md bg-muted p-8 text-center border-2 border-dashed border-border">
      <div className="rounded-full bg-background p-4 shadow-sm ring-1 ring-border">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="max-w-[300px]">
        <h3 className="text-lg font-semibold text-foreground">{message}</h3>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
