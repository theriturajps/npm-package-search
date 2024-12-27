import React, { useState, useEffect, useRef } from 'react';
import { Search, Package } from 'lucide-react';
import { searchNpmPackages } from '../services/npmApi';
import type { PackageInfo } from '../types/package';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

export function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<PackageInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchNpmPackages(debouncedQuery);
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch();
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search NPM packages..."
            className="w-full px-3 py-2 pl-10 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            aria-label="Search NPM packages"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </form>

      {showSuggestions && (query.length >= 2) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-sm text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((pkg) => (
                <li
                  key={pkg.name}
                  className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setQuery(pkg.name);
                    setShowSuggestions(false);
                    onSearch();
                  }}
                >
                  <div className="p-2 flex items-start gap-2">
                    <Package className="text-blue-500 mt-1 flex-shrink-0" size={14} />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{pkg.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{pkg.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}