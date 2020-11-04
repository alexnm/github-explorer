import { request } from '@octokit/request'
import { GithubCommit, GithubRepoContributor, GithubRepositoryInfo } from '../types'

export const searchRepoByName = async (searchText: string): Promise<GithubRepositoryInfo[]> => {
  const result = await request('GET /search/repositories', {
    headers: {
      authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
    q: searchText,
  })

  return result.data.items.map((repo) => ({
    id: repo.id,
    name: repo.name,
    ownerName: repo.owner.login,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    description: repo.description,
  }))
}

export const getRepoContributors = async (
  owner: string,
  repo: string
): Promise<GithubRepoContributor[]> => {
  const result = await request('GET /repos/{owner}/{repo}/contributors', {
    headers: {
      authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
    owner,
    repo,
    per_page: 100,
  })

  // @ts-ignore
  return result.data.map((user) => ({
    id: user.id,
    name: user.login,
    avatar: user.avatar_url,
    url: user.html_url,
    contributions: user.contributions,
  }))
}

export const getRepoCommits = async (owner: string, repo: string): Promise<GithubCommit[]> => {
  const result = await request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
    owner,
    repo,
    per_page: 100,
  })

  // @ts-ignore
  return result.data.map((commitResult) => ({
    sha: commitResult.sha,
    authorName: commitResult.author?.login ?? 'n/a',
    timestamp: new Date(commitResult.commit.author.date),
  }))
}

export default {
  searchRepoByName,
  getRepoContributors,
  getRepoCommits,
}
