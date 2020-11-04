import React from 'react'
import Link from 'next/link'
import { GithubRepositoryInfo } from '../types'
import styles from './repo-card.module.css'

export interface RepoCardProps {
  repo: GithubRepositoryInfo
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => (
  <Link href={`${repo.ownerName}/${repo.name}`}>
    <a className={styles.card}>
      <p className={styles.title}>
        {repo.ownerName}/{repo.name}
      </p>
      <p className={styles.description}>{repo.description}</p>
      <p>
        Stars: {repo.stars} | Forks: {repo.forks}
      </p>
    </a>
  </Link>
)
