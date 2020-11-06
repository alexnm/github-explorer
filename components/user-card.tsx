import React from 'react'
import { GithubRepoContributor } from '../types'
import styles from './user-card.module.css'

export interface UserCardProps {
  user: GithubRepoContributor
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <a
    className={styles.wrapper}
    href={user.url}
    target="_blank"
    rel="noreferrer noopener"
    title={`Visit the page of ${user.name}`}
  >
    <img className={styles.image} src={user.avatar} />
    <div>
      <p className={styles.name}>{user.name}</p>
      <p className={styles.info}>{user.contributions} commits</p>
    </div>
  </a>
)
