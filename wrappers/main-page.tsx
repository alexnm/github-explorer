import React, { useRef, useState } from 'react'
import { Layout } from '../components/layout'
import { RepoCard } from '../components/repo-card'
import { SearchBar } from '../components/search-bar'
import GithubService from '../services/github'
import { GithubRepositoryInfo } from '../types'

export const MainPageWrapper = () => {
  const [repos, setRepos] = useState<GithubRepositoryInfo[]>([])
  const [searchState, setSearchState] = useState<'initial' | 'pending' | 'done'>('initial')

  const handleSearch = async (searchText: string) => {
    if (searchText) {
      setSearchState('pending')
      const results = await GithubService.searchRepoByName(searchText)
      setRepos(results)
      setSearchState('done')
    } else {
      setSearchState('initial')
    }
  }

  return (
    <Layout>
      <SearchBar onSearchChange={handleSearch} />
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
    </Layout>
  )
}
