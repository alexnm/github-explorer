export interface GithubRepositoryInfo {
  id: number
  name: string
  ownerName: string
  stars: number
  forks: number
  description: string
}

export interface GithubRepoContributor {
  id: number,
  name: string,
  avatar: string,
  url: string,
  contributions: number
}

export interface GithubCommit {
  sha: string,
  timestamp: Date
  authorName: string
}