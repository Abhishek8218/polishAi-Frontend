import React from 'react'

interface ToggleProps {
  checked: boolean
  onChange: () => void
  label?: string
  description?: string
  disabled?: boolean
}

const Toggle = ({ checked, onChange, label, description, disabled = false }: ToggleProps) => {
  return (
    <div className={`flex justify-between items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-on-surface-variant">{label}</span>
          )}
          {description && (
            <span className="text-xs text-on-surface-variant/60">{description}</span>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={disabled ? undefined : onChange}
        className={`
          relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
          transition-colors duration-200 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-primary-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-surface
          ${checked ? 'bg-primary-indigo' : 'bg-[#161618] border border-[#2a2a2e]'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  )
}

export default Toggle