const Percent = (value, min, max) => {
  const diff = max - min
  if(diff === 0) return 0
  return ((value - min)*100/(max - min)).toFixed(2)
}

export default Percent;