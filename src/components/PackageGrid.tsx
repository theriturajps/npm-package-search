import React from 'react';
import { PackageCard } from './PackageCard';
import type { PackageInfo } from '../types/package';

interface PackageGridProps {
  packages: PackageInfo[];
  onPackageSelect: (pkg: PackageInfo) => void;
}

export function PackageGrid({ packages, onPackageSelect }: PackageGridProps) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.name}
          pkg={pkg}
          onClick={() => onPackageSelect(pkg)}
        />
      ))}
    </div>
  );
}