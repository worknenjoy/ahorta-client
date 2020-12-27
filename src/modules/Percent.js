const Percent = (value, min, max) => {
  if(!min && !max) return 0
  return Math.round((value - min)*100/(max - min))
}

export default Percent;