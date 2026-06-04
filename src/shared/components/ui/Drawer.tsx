import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  width?: string
}

const Drawer = ({ open, onClose, title, children, width = 'w-[440px]' }: DrawerProps) => {
  // Lock body scroll on mobile when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Desktop Drawer (lg+) ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          hidden lg:flex flex-col
          fixed top-0 right-0 h-full ${width}
          bg-[#161618]  border-l border-[#2a2a2e]
          shadow-2xl z-50
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <DrawerHeader title={title} onClose={onClose} />
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
      </div>

      {/* ── Mobile Full-screen Modal (< lg) ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          lg:hidden flex flex-col
          fixed inset-0 z-50
          bg-surface
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <DrawerHeader title={title} onClose={onClose} />
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
      </div>
    </>
  )
}

// ── Internal header ────────────────────────────────────────────────────────────
const DrawerHeader = ({ title, onClose }: { title: string; onClose: () => void }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2e] shrink-0">
    <h2 className="text-[17px] font-semibold text-on-surface">{title}</h2>
    <button
      onClick={onClose}
      aria-label="Close"
      className="
        w-8 h-8 flex items-center justify-center rounded-lg
        text-on-surface-variant hover:text-on-surface
        hover:bg-surface-container-high
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo
      "
    >
      <X size={18} />
    </button>
  </div>
)

export default Drawer