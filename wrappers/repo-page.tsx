import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import { RepoActivityChart } from '../components/repo-activity-chart'
import { RepoTimelineChart } from '../components/repo-timeline-chart'
import { UserCard } from '../components/user-card'
import GithubService from '../services/github'
import { GithubCommit, GithubRepoContributor } from '../types'
import styles from './repo-page.module.css'

export interface RepoPageWrapperProps {
  owner: string
  repo: string
}

export const RepoPageWrapper: React.FC<RepoPageWrapperProps> = ({ owner, repo }) => {
  const [contributors, setContributors] = useState<GithubRepoContributor[]>([])
  const [commits, setCommits] = useState<GithubCommit[]>([])

  const fetchContributors = async () => {
    if (!owner || !repo) {
      return
    }

    const result = await GithubService.getRepoContributors(owner as string, repo as string)
    setContributors(result)
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
    <Layout extraTitle={`${owner}/${repo}`}>
      <h2>Project Activity</h2>
      <div className={styles.charts}>
        <RepoActivityChart commits={commits} />
        {commits.length > 0 && <RepoTimelineChart commits={commits} />}
      </div>

      <div className={styles.contributors}>
        <h2>Contributors</h2>
        <ul className={styles.list}>
          {contributors.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
