export const formatCount = timestamp => {
  const dateObj = new Date(timestamp)
  const seconds = dateObj.getUTCSeconds()
  const minutes = dateObj.getUTCMinutes()
  const hours = dateObj.getUTCHours()
  const days = parseInt(timestamp / (1000 * 60 * 60 * 24))

  if (timestamp > (1000 * 60 * 60 * 24)) {
    return `${days.toString().padStart(2, '0')} days ${hours.toString().padStart(2, '0')} hours ago`
  }

  else if (timestamp > (1000 * 60 * 60)) {
    return `${hours.toString().padStart(2, '0')} hours ago`
  }
  else {
    return `${minutes} minutes ago`
  }
}