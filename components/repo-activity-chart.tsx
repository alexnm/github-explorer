import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { GithubCommit } from '../types'

export interface RepoActivityProps {
  commits: GithubCommit[]
}

const COLORS = [
  'var(--color-accent-500)',
  'var(--color-accent-400)',
  'var(--color-accent-300)',
  'var(--color-accent-200)',
  'var(--color-accent-100)',
]

export const RepoActivityChart: React.FC<RepoActivityProps> = ({ commits }) => {
  const commitsFrequency = commits.reduce((acc: Record<string, number>, commit: GithubCommit) => {
    if (acc[commit.authorName]) {
      acc[commit.authorName]++
    } else {
      acc[commit.authorName] = 1
    }

    return acc
  }, {})

  const data = Object.keys(commitsFrequency).map((key) => ({
    name: key,
    value: commitsFrequency[key],
  }))

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        nameKey="name"
        data={data}
        cx={200}
        cy={200}
        outerRadius={130}
        innerRadius={100}
        paddingAngle={2}
        fill="var(--color-accent-500)"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}
