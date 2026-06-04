import React from 'react'

interface ChipOption {
  label: string
  value: string
}

interface ChipGroupProps {
  label?: string
  options: ChipOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const ChipGroup = ({ label, options, value, onChange, className = '' }: ChipGroupProps) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                px-3.5 py-1.5 rounded-full text-sm font-medium
                transition-all duration-150 border
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo
                ${
                  isSelected
                    ? 'bg-primary-indigo text-on-primary border-primary-indigo shadow-sm shadow-primary-indigo/20'
                    : 'bg-[#161618]  border-[#2a2a2e] text-on-surface-variant  hover:border-outline hover:bg-surface-container-high'
                }
              `}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Single Chip (standalone use) ──────────────────────────────────────────────
interface ChipProps {
  label: string
  variant?: 'default' | 'teal' | 'indigo' | 'subtle'
  size?: 'sm' | 'md'
}

export const Chip = ({ label, variant = 'subtle', size = 'sm' }: ChipProps) => {
  const variantClass = {
    default: 'bg-[#161618]  border-[#2a2a2e] text-on-surface-variant',
    teal: 'bg-secondary-container text-on-secondary-container border-secondary-teal/30',
    indigo: 'bg-primary-container text-on-primary-container border-primary-indigo/30',
    subtle: 'bg-surface-container text-on-surface-variant border-outline-variant/50',
  }[variant]

  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'

  return (
    <span className={`inline-block rounded-full font-base border ${variantClass} ${sizeClass}`}>
      {label}
    </span>
  )
}

export default ChipGroup