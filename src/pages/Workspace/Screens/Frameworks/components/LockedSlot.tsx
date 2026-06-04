import React from 'react'
import { Lock } from 'lucide-react'

interface LockedSlotProps {
  onUpgrade?: () => void
}

const LockedSlot = ({ onUpgrade }: LockedSlotProps) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center gap-3 p-6
        rounded-xl min-h-[200px] text-center
        border-2 border-dashed 
        border-outline-variant
        bg-surface-container/40
      "
    >
      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
        <Lock size={16} className="text-on-surface-variant/50" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-[14px] text-on-surface">Slot Locked</p>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Unlock more slots to create specialized frameworks for every project.
        </p>
      </div>
      <button
        onClick={onUpgrade}
        className="text-sm font-medium text-secondary-teal hover:underline transition-opacity"
      >
        See Pro Plans
      </button>
    </div>
  )
}

export default LockedSlot