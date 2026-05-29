import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface PopoverDropdownProps {
  trigger?: ReactNode;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  placeholder?: string;
  className?: string;
  menuWidth?: string;
}

export default function PopoverDropdown({
  trigger,
  options,
  onSelect,
  selectedValue,
  placeholder = "Select...",
  className = "",
  menuWidth = "w-56",
}: PopoverDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smart positioning when dropdown opens
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownEstimatedWidth = 240; // approx width of dropdown

    let style: React.CSSProperties = {};

    // Check if dropdown will overflow on the right
    const spaceOnRight = viewportWidth - triggerRect.right;
    const spaceOnLeft = triggerRect.left;

    if (spaceOnRight < dropdownEstimatedWidth && spaceOnLeft > dropdownEstimatedWidth) {
      // Align to left edge of trigger
      style.right = "0";
      style.left = "auto";
    } else {
      // Default: align to right edge of trigger
      style.left = "0";
      style.right = "auto";
    }

    // Prevent going off top (if near bottom)
    if (triggerRect.bottom > window.innerHeight - 300) {
      style.bottom = "100%";
      style.top = "auto";
      style.marginBottom = "8px";
    } else {
      style.top = "100%";
      style.bottom = "auto";
      style.marginTop = "8px";
    }

    setDropdownStyle(style);
  }, [isOpen]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`cursor-pointer ${className}`}
      >
        {trigger || (
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#161618] border border-[#2a2a2e]">
            {placeholder}
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Menu with Smart Positioning */}
      {isOpen && (
        <div
          className={`absolute z-50 rounded-2xl border border-[#2a2a2e] bg-[#1a1a1e] shadow-2xl py-2 overflow-hidden ${menuWidth}`}
          style={dropdownStyle}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-[14px] transition-colors hover:bg-[#252538] hover:cursor-pointer
                ${selectedValue === option.value ? "bg-[#252538] text-white" : "text-[#c4c4ce]"}
                ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {option.icon && <span className="text-[#8b87f0]">{option.icon}</span>}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}