const capitalize = (category) => {
  if (category === 'valentines') {
    return 'Valentine\'s'
  }
  const arr = category.split('')
  return `${arr[0].toUpperCase()}${(arr.slice(1)).join('')}`
}

export default capitalize
