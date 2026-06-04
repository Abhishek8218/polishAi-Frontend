import React from 'react'

interface UsageBarProps {
  used: number
  total: number
  onUpgrade?: () => void
}

const UsageBar = ({ used, total, onUpgrade }: UsageBarProps) => {
  const percentage = Math.min((used / total) * 100, 100)
  const isFull = used >= total

  return (
    <div className="flex items-center gap-4 border border-[#2a2a2e] bg-[#161618] rounded-xl px-4 py-3">
      <span className="text-sm text-on-surface-variant whitespace-nowrap shrink-0">
        Usage: {used} of {total} used
      </span>

      <div className="flex-1 h-1.5 bg-[#1a1a1e] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull ? 'bg-error' : 'bg-secondary-teal'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-sm text-on-surface-variant whitespace-nowrap shrink-0">
        Need more slots ?{' '}
        <button
          onClick={onUpgrade}
          className="font-semibold text-secondary-teal hover:underline focus:outline-none"
        >
          Upgrade →
        </button>
      </span>
    </div>
  )
}

export default UsageBar