import type { PackageInfo } from '../types/package'

const NPM_REGISTRY_URL = 'https://registry.npmjs.org/-/v1/search'

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function searchNpmPackages(query: string): Promise<PackageInfo[]> {
  try {
    const response = await fetch(
      `${NPM_REGISTRY_URL}?text=${encodeURIComponent(query)}&size=20`
    )

    if (!response.ok) {
      throw new ApiError(
        `API request failed with status ${response.status}`,
        response.status
      )
    }

    const data = await response.json()

    return data.objects.map((obj: any) => ({
      name: obj.package.name,
      version: obj.package.version,
      description: obj.package.description || '',
      author: obj.package.publisher?.username || 'Unknown',
      homepage: obj.package.links?.homepage,
      repository: obj.package.links?.repository
        ? { url: obj.package.links.repository }
        : undefined,
      keywords: obj.package.keywords || [],
      license: obj.package.license || 'Unknown',
      downloads: obj.downloads.weekly,
      updated: new Date(obj.updated).toISOString().split('T')[0],
    }))
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Failed to fetch packages. Please try again later.')
  }
}
