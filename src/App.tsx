import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PackageCard } from './components/PackageCard';
import { PackageDetails } from './components/PackageDetails';
import { ErrorMessage } from './components/ErrorMessage';
import { Package } from 'lucide-react';
import { searchNpmPackages } from './services/npmApi';
import type { PackageInfo } from './types/package';
import { Header } from './components/Header';
import { PackageGrid } from './components/PackageGrid';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [query, setQuery] = useState('');
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchNpmPackages(query);
      setPackages(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      </Header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : packages.length > 0 ? (
          <PackageGrid 
            packages={packages} 
            onPackageSelect={setSelectedPackage} 
          />
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            {query ? 'No packages found.' : 'Start searching for NPM packages!'}
          </div>
        )}
      </main>

      {selectedPackage && (
        <PackageDetails
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </>
  );
}

export default App;