import { request } from '@octokit/request'
import { GithubCommit, GithubRepoContributor, GithubRepositoryInfo } from '../types'

export const searchRepoByName = async (searchText: string): Promise<GithubRepositoryInfo[]> => {
  const response = await fetch(`/api/repos?searchText=${searchText}`)
  const responseJSON = await response.json()

  return responseJSON as GithubRepositoryInfo[]
}

export const getRepoContributors = async (
  owner: string,
  repo: string
): Promise<GithubRepoContributor[]> => {
  const response = await fetch(`/api/contributors?owner=${owner}&repo=${repo}`)
  const responseJSON = await response.json()

  return responseJSON as GithubRepoContributor[]
}

export const getRepoCommits = async (owner: string, repo: string): Promise<GithubCommit[]> => {
  const response = await fetch(`/api/commits?owner=${owner}&repo=${repo}`)
  const responseJSON = await response.json()

  return responseJSON.map((commit) => ({
    ...commit,
    timestamp: new Date(commit.timestamp),
  })) as GithubCommit[]
}

export default {
  searchRepoByName,
  getRepoContributors,
  getRepoCommits,
}
