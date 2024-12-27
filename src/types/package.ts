export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  homepage?: string;
  repository?: {
    url: string;
  };
  keywords: string[];
  license: string;
  downloads: number;
  updated: string;
}