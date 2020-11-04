import React from 'react'
import { GithubRepoContributor } from '../types'
import styles from './user-card.module.css'

export interface UserCardProps {
  user: GithubRepoContributor
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div>
    <img className={styles.image} src={user.avatar} />
    <a href={user.url} target="_blank" rel="noreferrer noopener">
      {user.name}
    </a>
    <span>{user.contributions} contributions</span>
  </div>
)
