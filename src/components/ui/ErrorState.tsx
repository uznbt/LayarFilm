import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 rounded-md bg-muted p-8 text-center border-2 border-dashed border-red-500/20">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <div className="max-w-[400px]">
        <h3 className="text-lg font-semibold text-foreground">Aduh! Kesalahan API.</h3>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-2 flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
