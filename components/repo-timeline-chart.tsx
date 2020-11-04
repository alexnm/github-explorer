import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import { GithubCommit } from '../types'
import { getKeyFromTimestamp } from '../utils'

export interface RepoTimelineProps {
  commits: GithubCommit[]
}

export const RepoTimelineChart: React.FC<RepoTimelineProps> = ({ commits }) => {
  const commitsOrdered = commits.reverse()
  const firstTimestamp = new Date(commitsOrdered[0].timestamp)
  const lastCommitTimestamp = new Date(commitsOrdered[commits.length - 1].timestamp)
  const commitsTimeline: Record<string, { commits: number; month: string }> = {}

  while (firstTimestamp < lastCommitTimestamp) {
    const key = getKeyFromTimestamp(firstTimestamp)

    commitsTimeline[key] = {
      commits: 0,
      month: key,
    }

    firstTimestamp.setMonth(firstTimestamp.getMonth() + 1)
  }

  const lastKey = getKeyFromTimestamp(lastCommitTimestamp)
  commitsTimeline[lastKey] = {
    commits: 0,
    month: lastKey,
  }

  commitsOrdered.forEach((commit: GithubCommit) => {
    const key = getKeyFromTimestamp(commit.timestamp)

    if (commitsTimeline[key]) {
      commitsTimeline[key].commits++
    }
  })

  return (
    <BarChart width={400} height={400} data={Object.values(commitsTimeline)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis dataKey="commits" />
      <Tooltip />
      <Bar dataKey="commits" fill="var(--color-accent-500)" />
    </BarChart>
  )
}
