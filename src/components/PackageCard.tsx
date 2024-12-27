import React from 'react';
import { Package } from 'lucide-react';
import type { PackageInfo } from '../types/package';

interface PackageCardProps {
  pkg: PackageInfo;
  onClick: () => void;
}

export function PackageCard({ pkg, onClick }: PackageCardProps) {
  return (
    <article
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Package className="text-blue-500 flex-shrink-0" size={18} />
          <h2 className="text-base font-medium text-gray-900 line-clamp-1">{pkg.name}</h2>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded flex-shrink-0">
          v{pkg.version}
        </span>
      </div>
      
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
      
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span>{pkg.author}</span>
        <span>{pkg.license}</span>
        <span>{pkg.downloads.toLocaleString()} weekly</span>
      </div>

      {pkg.keywords && pkg.keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="px-1.5 py-0.5 text-xs bg-gray-50 text-gray-600 rounded"
            >
              {keyword}
            </span>
          ))}
          {pkg.keywords.length > 3 && (
            <span className="px-1.5 py-0.5 text-xs bg-gray-50 text-gray-600 rounded">
              +{pkg.keywords.length - 3}
            </span>
          )}
        </div>
      )}
    </article>
  );
}