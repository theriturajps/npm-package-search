import {
  X,
  Package,
  Github,
  Globe,
  CalendarDays,
  ExternalLink,
  DownloadCloud,
  BookOpen,
  User,
  Tag,
} from 'lucide-react'
import type { PackageInfo } from '../types/package'

interface PackageDetailsProps {
  pkg: PackageInfo
  onClose: () => void
}

export function PackageDetails({ pkg, onClose }: PackageDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="text-blue-500" size={20} />
            <div>
              <h2 className="text-lg font-medium">{pkg.name}</h2>
              <p className="text-xs text-gray-500">v{pkg.version}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600">{pkg.description}</p>

          <div className="mt-4 grid gap-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <User className="text-gray-400" size={16} />
                <span className="text-gray-600">{pkg.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DownloadCloud className="text-gray-400" size={16} />
                <span className="text-gray-600">
                  {pkg.downloads.toLocaleString()} weekly
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="text-gray-400" size={16} />
                <span className="text-gray-600">{pkg.license}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="text-gray-400" size={16} />
                <span className="text-gray-600">{pkg.updated}</span>
              </div>
            </div>

            {pkg.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {pkg.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700"
                  >
                    <Tag size={12} />
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <div className="grid gap-2 mt-3">
              {pkg.homepage && (
                <a
                  href={pkg.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600"
                >
                  <Globe size={16} />
                  <span>Homepage</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {pkg.repository?.url && (
                <a
                  href={pkg.repository.url.replace('git+', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600"
                >
                  <Github size={16} />
                  <span>Repository</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Installation</h3>
            <pre className="bg-gray-900 text-white p-3 rounded text-sm overflow-x-auto">
              <code>npm install {pkg.name}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
