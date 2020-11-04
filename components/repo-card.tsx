import React from 'react'
import Link from 'next/link'
import { GithubRepositoryInfo } from '../types'

export interface RepoCardProps {
  repo: GithubRepositoryInfo
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => (
  <Link href={`${repo.ownerName}/${repo.name}`}>
    <a>
      {repo.ownerName}/{repo.name} - {repo.stars} stars
    </a>
  </Link>
)
