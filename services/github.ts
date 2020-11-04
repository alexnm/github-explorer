import { request } from "@octokit/request"
import { GithubCommit, GithubRepoContributor, GithubRepositoryInfo } from "../types"

export const searchRepoByName = async (searchText: string): Promise<GithubRepositoryInfo[]> => {
  const result = await request('GET /search/repositories', {
    headers: {
      authorization: "token e94e95da35ca0d0224ec84398f9af90f1074ca38",
    },
    q: searchText
  })

  return result.data.items.map(repo => ({
    id: repo.id,
    name: repo.name,
    ownerName: repo.owner.login,
    stars: repo.stargazers_count
  }))
}

export const getRepoContributors = async (owner: string, repo: string): Promise<GithubRepoContributor[]> => {
  const result = await request('GET /repos/{owner}/{repo}/contributors', {
    headers: {
      authorization: "token e94e95da35ca0d0224ec84398f9af90f1074ca38",
    },
    owner,
    repo
  })

  // @ts-ignore
  return result.data.map(user => ({
    id: user.id,
    name: user.login,
    avatar: user.avatar_url,
    url: user.html_url,
    contributions: user.contributions
  }))
}

export const getRepoCommits = async (owner: string, repo: string): Promise<GithubCommit[]> => {
  const result = await request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      authorization: "token e94e95da35ca0d0224ec84398f9af90f1074ca38",
    },
    owner,
    repo
  })

  // @ts-ignore
  return result.data.map(commitResult => ({
    sha: commitResult.sha,
    authorName: commitResult.author.login,
    timestamp: commitResult.commit.author.date
  }))
}

export default {
  searchRepoByName,
  getRepoContributors,
  getRepoCommits
}