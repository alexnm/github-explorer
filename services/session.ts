export const persistSearchText = (searchText: string) => {
  sessionStorage.setItem('searchText', searchText)
}

export const clearSearchText = () => {
  sessionStorage.removeItem('searchText')
}

export const getPersistedSearchText = () => {
  return typeof window === 'undefined' ? '' : sessionStorage.getItem('searchText') ?? ''
}
