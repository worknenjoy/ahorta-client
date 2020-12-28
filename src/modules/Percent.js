const Percent = (value, min, max) => {
  const diff = max - min
  if(diff === 0) return 0
  const result = Math.round((value - min)*100/(max - min))
  if(result < 0 || result > 100) {
    return 'wrong input'
  } else {
    return result
  }
}

export default Percent;