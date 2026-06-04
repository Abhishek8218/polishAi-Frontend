import { ArrowUp, CreditCard, DraftingCompass, History, Settings, Sparkles, User } from "lucide-react";
import type { NavItem } from "../types/workspace.types";
import { PolishAiLogoImage } from "../../../shared/assets/shared.asset";

const navItems: { label: NavItem; icon: React.ReactNode }[] = [
  { label: "Polish", icon: <Sparkles size={20} /> },
  { label: "Frameworks", icon: <DraftingCompass size={20} /> },
  { label: "History", icon: <History size={20} /> },
  { label: "Subscription", icon: <CreditCard size={20} /> },
  { label: "Settings", icon: <Settings size={20} /> },
];

interface SidebarProps {
  open: boolean;
  activeNav: NavItem;
  onNavChange: (item: NavItem) => void;
  onClose: () => void;
}

export default function Sidebar({ open, activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className={`
      fixed left-0 top-0 z-30 h-full w-[240px] flex flex-col
      bg-[#18181a] border-r border-[#2a2a2e]
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 pt-3 pb-8">
        {/* <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a3fc8] to-[#2e2899] shadow-lg shadow-[#3d3a8c]/30">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-[15px] font-bold text-white tracking-tight leading-none mb-0.5">Polish AI</p>
          <p className="text-[11px] text-[#5c5c6e] font-medium">AI Assistant</p>
        </div> */}
         <img src={PolishAiLogoImage} className="w-36" alt="Polish Ai" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map(({ label, icon }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => onNavChange(label)}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-left
                transition-all duration-150 group
                ${isActive
                  ? "bg-[#252538] text-white"
                  : "text-[#6b6b7e] hover:bg-[#1e1e26] hover:text-[#a0a0b4]"
                } hover:cursor-pointer
              `}
            >
              <span className={`transition-colors duration-150 ${isActive ? "text-[#8b87f0]" : "group-hover:text-[#8b87f0]"}`}>
                {icon}
              </span>
              <span className="text-[12px] font-semibold tracking-[0.8px] uppercase">
                {label}
              </span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8b87f0]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-6 flex flex-col gap-2">
        <button className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-[#0d2e2a] border border-[#1a4a44] text-[#4ecdc4] text-[13px] font-semibold tracking-wide hover:bg-[#0f3830] transition-colors duration-150">
          <ArrowUp size={16} />
          Upgrade
        </button>
      </div>
    </aside>
  );
}