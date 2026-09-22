"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
      router.push(`/search?${params.toString()}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form className="relative w-full" onSubmit={handleSearch}>
      <SearchIcon className="absolute w-4 h-4 text-muted-foreground left-2.5 top-1/2 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search"
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}