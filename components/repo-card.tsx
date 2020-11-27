import React from 'react'
import Link from 'next/link'
import { GithubRepositoryInfo } from '../types'
import styles from './repo-card.module.css'

export interface RepoCardProps {
  repo: GithubRepositoryInfo
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => (
  <Link href={`${repo.ownerName}/${repo.name}`}>
    <a
      className={styles.card}
      aria-label={`${repo.name} by ${repo.ownerName}`}
      aria-describedby={repo.id.toString()}
    >
      <p className={styles.title}>
        {repo.ownerName}/{repo.name}
      </p>
      <p id={repo.id.toString()} className={styles.description}>
        {repo.description}
      </p>
      <p>
        <span>Stars: {repo.stars}</span> | <span>Forks: {repo.forks}</span>
      </p>
    </a>
  </Link>
)
