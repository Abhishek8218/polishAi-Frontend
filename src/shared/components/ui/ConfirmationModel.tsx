import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmationModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-3xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2e]">
          <div className="flex items-center gap-3">
            {variant === "danger" && (
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
            )}
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b6b7e] hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Message */}
        <div className="px-6 py-6 text-[#c4c4ce] leading-relaxed">
          {message}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 py-5 border-t border-[#2a2a2e] bg-[#161618]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3.5 rounded-2xl border border-[#2a2a2e] text-white font-medium hover:bg-[#222226] transition-colors"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3.5 rounded-2xl font-semibold transition-all ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-[#4a3fc8] hover:bg-[#3a35a0] text-white"
            }`}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}