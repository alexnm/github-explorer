const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const getKeyFromTimestamp = (date: Date) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${MONTH_NAMES[month]} ${year}`
}

export const debounce = (fn: Function, timeout: number) => {
  let timeoutHook: NodeJS.Timeout | null

  return (...args: unknown[]) => {
    if (timeoutHook) {
      clearTimeout(timeoutHook)
    }

    timeoutHook = setTimeout(() => {
      timeoutHook = null
      fn(...args)
    }, timeout)
  }
}
