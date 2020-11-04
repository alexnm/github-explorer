import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { UserCard } from '../../components/user-card'
import GithubService from '../../services/github'
import { GithubCommit, GithubRepoContributor } from '../../types'

// export interface RepoPageProps {
//   owner: string
//   repo: string
// }

export default function RepoPage() {
  const router = useRouter()

  const { owner, repo } = router.query
  const [collaborators, setCollaborators] = useState<GithubRepoContributor[]>([])
  const [commits, setCommits] = useState<GithubCommit[]>([])

  const fetchContributors = async () => {
    if (!owner || !repo) {
      return
    }

    const result = await GithubService.getRepoContributors(owner as string, repo as string)
    setCollaborators(result)
  }

  const fetchCommits = async () => {
    if (!owner || !repo) {
      return
    }

    const result = await GithubService.getRepoCommits(owner as string, repo as string)
    setCommits(result)
  }

  useEffect(() => {
    fetchContributors()
    fetchCommits()
  }, [])

  return (
    <main>
      Repo {owner}/{repo}
      <div>Collaborators:</div>
      <ul>
        {collaborators.map((colab) => (
          <li>
            <UserCard user={colab} />
          </li>
        ))}
      </ul>
      <div>Commits:</div>
      <ul>
        {commits.map((commit) => (
          <li>
            {commit.authorName} - {commit.timestamp}
          </li>
        ))}
      </ul>
    </main>
  )
}
