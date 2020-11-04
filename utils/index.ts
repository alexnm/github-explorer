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
