import { useRouter } from 'next/router'
import React from 'react'
import { RepoPageWrapper } from '../../wrappers/repo-page'

export default function RepoPage() {
  const router = useRouter()

  const { owner, repo } = router.query

  if (typeof owner !== 'string' || typeof repo !== 'string') {
    return null
  }

  return <RepoPageWrapper owner={owner} repo={repo} />
}
