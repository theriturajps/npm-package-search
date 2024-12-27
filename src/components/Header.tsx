import React from 'react';
import { Package } from 'lucide-react';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="text-blue-500" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">NPM Package Search</h1>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}