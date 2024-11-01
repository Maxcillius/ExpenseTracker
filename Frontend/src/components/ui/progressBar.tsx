const ThresholdProgressBar = ({ value = 0, max = 100, height = "h-4" }) => {
  const clampedValue = Math.min(Math.max(0, value), max)
  const percentage = (clampedValue / max) * 100
  const width = `${percentage}%`
  
  // Enhanced color calculation for more vibrant colors
  // Starting with a vibrant green (#22c55e) and ending with a vibrant red (#ef4444)
  const getColor = (percent: number) => {
    // Use HSL for smoother, more vibrant transitions
    const hue = 120 - (percent * 120 / 100) // 120 is green, 0 is red in HSL
    return `hsl(${hue}, 80%, 45%)` // Increased saturation to 80%, controlled lightness at 45%
  }

  return (
    <div className="w-full bg-gray-200 rounded-full shadow-inner">
      <div 
        className={`${height} rounded-full transition-all duration-300 ease-out relative overflow-hidden`}
        style={{
          width,
          backgroundColor: getColor(percentage),
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) inset',
        }}
      >
        {/* Glossy overlay effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-20 rounded-t-full"
        />
        {/* Bottom shine effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent opacity-10 rounded-b-full"
        />
      </div>
    </div>
  )
}

export default ThresholdProgressBar