export const formatCount = timestamp => {
  const dateObj = new Date(timestamp)
  const seconds = dateObj.getUTCSeconds()
  const minutes = dateObj.getUTCMinutes()
  const hours = dateObj.getUTCHours()
  const days = parseInt(timestamp / (1000 * 60 * 60 * 24))

  return `${hours}h ${minutes}m ${seconds}s ago`
}