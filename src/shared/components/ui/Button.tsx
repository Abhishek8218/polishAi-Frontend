import React from 'react';

interface ButtonProps {
  /** Button text or children */
  children?: React.ReactNode;
  
  /** Icon component (React Node) */
  icon?: React.ReactNode;
  
  /** Hex color (e.g., "#0d2e2a", "0d2e2a", "#ff0000") */
  color?: string;
  
  /** Button variant */
  variant?: 'filled' | 'outlined' | 'ghost';
  
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Click handler */
  onClick?: () => void;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Additional classes - HIGHEST PRIORITY (overrides everything) */
  className?: string;
  
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  
  /** Loading state */
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  color = '#0d2e2a',
  variant = 'filled',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  loading = false,
}) => {
  // Normalize hex color (add # if missing)
  const normalizedColor = color.startsWith('#') ? color : `#${color}`;

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Base classes
  const baseClasses = `
    flex items-center justify-center gap-2 
    font-medium rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:cursor-pointer
  `;

  // Dynamic styles based on hex color
  const buttonStyle: React.CSSProperties = {
    backgroundColor: variant === 'filled' ? normalizedColor : 'transparent',
    color: variant === 'filled' 
      ? '#ffffff' 
      : normalizedColor,
    border: variant === 'outlined' 
      ? `2px solid ${normalizedColor}` 
      : 'none',
  };

  // Hover effect using CSS variable (better for hover states)
  const hoverStyle = variant === 'filled' 
    ? { '--hover-color': normalizedColor } as React.CSSProperties 
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...buttonStyle, ...hoverStyle }}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variant === 'filled' ? 'hover:brightness-90 active:brightness-75' : ''}
        ${variant === 'outlined' ? 'hover:bg-opacity-10' : ''}
        ${variant === 'ghost' ? 'hover:bg-opacity-10' : ''}
        ${className}   // ← This has highest priority
      `}
    >
      {/* Icon */}
      {icon && !loading && (
        <span className="w-5 h-5 flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <span 
          className="w-5 h-5 border-2 rounded-full animate-spin"
          style={{
            borderColor: variant === 'filled' ? 'rgba(255,255,255,0.3)' : `${normalizedColor}30`,
            borderTopColor: variant === 'filled' ? '#ffffff' : normalizedColor,
          }}
        />
      )}

      {/* Text */}
      {children && <span className="whitespace-nowrap text-[14px] font-medium">{children}</span>}
    </button>
  );
};

export default Button;