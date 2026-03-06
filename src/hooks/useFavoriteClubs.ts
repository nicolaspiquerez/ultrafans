import { useState, useCallback } from "react";

const STORAGE_KEY = "ultrafans-favorite-clubs";

function readFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavoriteClubs() {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  const toggleFavorite = useCallback((clubId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (clubId: string) => favorites.includes(clubId),
    [favorites]
  );

  return { toggleFavorite, isFavorite };
}
