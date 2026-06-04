import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = ({ label, error, hint, className = '', ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-on-surface-variant">{label}</label>
      )}
      <textarea
        className={`
          w-full px-3 py-2.5 rounded-lg border text-sm 
          text-on-surface placeholder-on-surface-variant/40
          bg-[#161618]  border-[#2a2a2e]
          focus:outline-none focus:ring-2 focus:ring-primary-indigo/40 focus:border-primary-indigo
          resize-none transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-on-surface-variant/60">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  )
}

export default Textarea