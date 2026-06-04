import React from 'react'

interface SegmentOption {
  label: string
  value: string
}

interface SegmentedControlProps {
  label?: string
  options: SegmentOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const SegmentedControl = ({ label, options, value, onChange, className = '' }: SegmentedControlProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-on-surface-variant">{label}</span>
      )}
      <div className="flex rounded-lg border  bg-[#161618]  border-[#2a2a2e] overflow-hidden w-fit ">
        {options.map((option, idx) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                px-4 py-2 text-sm font-medium transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-indigo
                ${idx !== 0 ? 'border-l border-outline-variant' : ''}
                ${
                  isSelected
                    ? 'bg-primary-indigo text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
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

export default SegmentedControl