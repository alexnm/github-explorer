import { ChangeEvent, useState } from 'react'
import styles from './search-bar.module.css'

export interface SearchBarProps {
  onSearchChange: (searchText: string) => void
  initialValue?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, initialValue }) => {
  const [searchText, setSearchText] = useState<string>(initialValue ?? '')

  const handleSubmit = () => {
    onSearchChange(searchText)
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value)
    onSearchChange(evt.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <input
        autoFocus
        className={styles.input}
        type="text"
        placeholder="eg: react, vue, ..."
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
