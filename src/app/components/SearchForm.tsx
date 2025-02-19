// components/SearchForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie, SearchResponse } from "../types/movie";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get<SearchResponse>(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                query: query,
                language: "ja-JP",
                page: 1,
              },
            }
          );
          setResults(response.data.results);
        } catch (error) {
          console.error("検索エラー:", error);
        }
      } else {
        setResults([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="映画タイトルを入力"
        className="p-2 border rounded w-full text-black"
      />

      <div className="mt-4 grid grid-cols-1 gap-4">
        {results.map((movie: Movie) => (
          <div key={movie.id} className="border p-2 rounded flex">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="h-48 object-contain"
            />
            <div className="ml-5">
              <h3 className="font-bold mt-2">{movie.title}</h3>
              <p className="text-sm text-gray-600">
                {movie.release_date?.split("-")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
