import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Layout } from '../components/layout'
import { RepoCard } from '../components/repo-card'
import { SearchBar } from '../components/search-bar'
import GithubService from '../services/github'
import * as SessionService from '../services/session'
import { GithubRepositoryInfo } from '../types'

export const MainPageWrapper = () => {
  const initialSearchText = SessionService.getPersistedSearchText()

  const [repos, setRepos] = useState<GithubRepositoryInfo[]>([])
  const [searchState, setSearchState] = useState<'initial' | 'pending' | 'done'>('initial')
  const searchInput = useRef<HTMLInputElement>(null)

  const handleSearch = async (searchText: string) => {
    if (searchText) {
      setSearchState('pending')
      const results = await GithubService.searchRepoByName(searchText)
      setRepos(results)
      setSearchState('done')
      SessionService.persistSearchText(searchText)
    } else {
      setSearchState('pending')
      const results = await GithubService.getReposByStars()
      setRepos(results)
      setSearchState('done')
      if (initialSearchText) {
        SessionService.clearSearchText()
      }
    }
  }

  useEffect(() => {
    handleSearch(initialSearchText)
    searchInput.current?.focus()
    searchInput.current?.setSelectionRange(0, searchInput.current?.value.length)
  }, [])

  return (
    <Layout>
      <Head>
        <title>GitHub Explorer</title>
      </Head>
      <SearchBar onSearchChange={handleSearch} initialValue={initialSearchText} ref={searchInput} />
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
