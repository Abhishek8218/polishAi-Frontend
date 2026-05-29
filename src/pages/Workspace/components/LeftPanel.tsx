import { useState, useRef, useEffect } from "react";

const frameworks = [
  "Professional Clarity (Standard) — Clear & Concise",
  "Executive Summary — Formal & Authoritative",
  "Casual Tone — Friendly & Approachable",
  "Academic Style — Scholarly & Precise",
  "Creative Flair — Vivid & Engaging",
  "Technical Depth — Detailed & Methodical",
];

const recentActivity = [
  { title: "Q3 Marketing Update", time: "2 mins ago" },
  { title: "Client Proposal", time: "1 hour ago" },
  { title: "Team Sync Notes", time: "3 hours ago" },
  { title: "Product Roadmap", time: "Yesterday" },
];

const SparkleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

interface LeftPanelProps {
  inputText: string;
  onInputChange: (v: string) => void;
  framework: string;
  onFrameworkChange: (v: string) => void;
  onPolish: () => void;
  isPolishing: boolean;
}

export default function LeftPanel({
  inputText,
  onInputChange,
  framework,
  onFrameworkChange,
  onPolish,
  isPolishing,
}: LeftPanelProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col flex-1 lg:flex-none lg:w-[55%] lg:border-r lg:border-[#2a2a2e] overflow-y-auto bg-[#111110]">
      <div className="p-5 lg:p-7 flex flex-col gap-5 min-h-full">

        {/* Label */}
        <div>
          <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">Your Text</p>
        </div>

        {/* Textarea */}
        <div className="relative flex flex-col rounded-xl border border-[#2a2a2e] bg-[#161618] shadow-inner overflow-hidden min-h-[300px] lg:flex-1">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Paste or type your content here..."
            className="flex-1 w-full resize-none bg-transparent text-[15px] text-[#d4d4d8] placeholder-[#3d3d4a] leading-relaxed px-5 pt-5 pb-3 outline-none min-h-[260px] lg:min-h-[320px]"
            style={{ fontFamily: "inherit" }}
          />
          {/* Footer strip */}
          <div className="flex items-center gap-4 px-5 py-3 border-t border-[#222226]">
            <span className="text-[11px] text-[#4a4a5a] font-medium">{charCount} characters</span>
            <span className="text-[#2e2e3a]">·</span>
            <span className="text-[11px] text-[#4a4a5a] font-medium">{wordCount} words</span>
            {charCount > 0 && (
              <button
                onClick={() => onInputChange("")}
                className="ml-auto text-[11px] text-[#4a4a5a] hover:text-[#8b87f0] transition-colors font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Framework Selector */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">Framework Selector</p>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#161618] border border-[#2a2a2e] text-[14px] text-[#c4c4ce] hover:border-[#3a3a4a] transition-colors duration-150"
            >
              <span className="truncate text-left">{framework}</span>
              <span className={`shrink-0 text-[#5c5c6e] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                <ChevronIcon />
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 z-20 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] shadow-2xl overflow-hidden">
                {frameworks.map((f) => (
                  <button
                    key={f}
                    onClick={() => { onFrameworkChange(f); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-[13px] transition-colors duration-100 ${
                      f === framework
                        ? "bg-[#252538] text-white"
                        : "text-[#9090a0] hover:bg-[#1e1e26] hover:text-[#c4c4ce]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Polish Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onPolish}
            disabled={isPolishing || !inputText.trim()}
            className={`
              relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl
              text-[14px] font-semibold tracking-wide text-white
              transition-all duration-200 overflow-hidden
              ${!inputText.trim() ? "opacity-40 cursor-not-allowed bg-[#1a3a36]" : "bg-gradient-to-r from-[#0a6b60] to-[#0d8a7c] hover:from-[#0c7a6e] hover:to-[#0f9c8c] shadow-lg shadow-[#0a6b60]/25 active:scale-[0.99]"}
            `}
          >
            {isPolishing ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span>Polishing...</span>
              </>
            ) : (
              <>
                <SparkleIcon />
                <span>Polish It</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-[#3d3d4a]">This action will use 1 credit. Free users get 5 daily.</p>
        </div>

        {/* Recent Activity */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">Recent Activity</p>
            <button className="text-[12px] text-[#5c5c8a] hover:text-[#8b87f0] font-medium transition-colors">View all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {recentActivity.map((item) => (
              <div
                key={item.title}
                className="shrink-0 w-[170px] p-3 rounded-xl bg-[#161618] border border-[#222226] hover:border-[#2e2e3a] transition-colors cursor-pointer"
              >
                <p className="text-[12px] font-semibold text-[#c4c4ce] truncate mb-1">{item.title}</p>
                <p className="text-[11px] text-[#3d3d4a]">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}