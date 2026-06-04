import React from 'react'

interface RangeSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  valueLabel?: string
  className?: string
}

const RangeSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  valueLabel,
  className = '',
}: RangeSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-on-surface-variant">{label}</label>
        {valueLabel && (
          <span className="text-xs font-semibold text-primary-text-color">{valueLabel}</span>
        )}
      </div>

      <div className="relative w-full h-5 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 rounded-full bg-[#1a1a1e] overflow-hidden">
          {/* Filled portion */}
          <div
            className="h-full bg-primary-indigo rounded-full transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Native range input (invisible but functional) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />

        {/* Custom thumb */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white border-2 border-white shadow-md pointer-events-none transition-all duration-100 hover:scale-105  "
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  )
}

export default RangeSlider