import React from 'react'
import { ChangeEvent, useCallback, useState } from 'react'
import { debounce } from '../utils'
import styles from './search-bar.module.css'

export interface SearchBarProps {
  onSearchChange: (searchText: string) => void
  initialValue?: string
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearchChange, initialValue }, ref) => {
    const [searchText, setSearchText] = useState<string>(initialValue ?? '')

    const debouncedOnSearchChange = useCallback(debounce(onSearchChange, 200), [])

    const handleSubmit = () => {
      onSearchChange(searchText)
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchText(evt.target.value)
      debouncedOnSearchChange(evt.target.value)
    }

    return (
      <div className={styles.wrapper}>
        <input
          autoFocus
          ref={ref}
          className={styles.input}
          type="text"
          aria-label="search on github"
          placeholder="eg: react, vue, ..."
          defaultValue={searchText}
          onChange={handleInputChange}
        />
        <button
          className={styles.button}
          onClick={handleSubmit}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              handleSubmit()
            }
          }}
        >
          Search
        </button>
      </div>
    )
  }
)
