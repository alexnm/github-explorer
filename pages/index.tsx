import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { RepoCard } from '../components/repo-card'
import GithubService from '../services/github'
import { GithubRepositoryInfo } from '../types'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [repos, setRepos] = useState<GithubRepositoryInfo[]>([])
  const [searchState, setSearchState] = useState<'initial' | 'pending' | 'done'>('initial')

  const handleSearch = async () => {
    const searchText = inputRef.current?.value
    if (searchText) {
      setSearchState('pending')
      const results = await GithubService.searchRepoByName(searchText)
      console.log(results)
      setRepos(results)
      setSearchState('done')
    }
  }

  return (
    <main>
      <div>
        <input type="text" placeholder="Search" onChange={handleSearch} ref={inputRef} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchState === 'pending' && <span>Loading...</span>}
      {searchState === 'done' && (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
