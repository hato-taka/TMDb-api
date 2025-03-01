// components/SearchForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie, SearchResponse } from "../types/movie";
import { Item } from "./Item";

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
          console.log(response.data.results);
          setResults(response.data.results);
        } catch (error) {
          console.error("検索エラー:", error);
        }
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

      <div>
        {results.map((movie: Movie) => (
          <div key={movie.id} className="p-2 rounded">
            <Item movie={movie} key={movie.id} hasAddButton={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
