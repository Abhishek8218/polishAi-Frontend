import React from "react";
import { Sparkles } from "lucide-react";

interface FooterProps {
  currentPage?: string;
  onSwitchView?: (view: "landing" | "login" | "signup" | "forgot_password") => void;
}

export default function Footer({ currentPage, onSwitchView }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (currentPage !== "landing" && onSwitchView) {
      e.preventDefault();
      onSwitchView("landing");
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-[#050412] text-white pt-20 pb-10  border-outline-variant/10 relative overflow-hidden">
      
      {/* Decorative tiny grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-outline-variant/10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onSwitchView && onSwitchView("landing")} 
              className="flex items-center gap-2 group focus:outline-none text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#006A60] flex items-center justify-center text-white font-bold text-lg border border-outline-variant/15 group-hover:bg-[#004d46] transition-all">
                P
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white">
                Polish <span className="text-[#8cf5e4]">AI</span>
              </span>
            </button>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Refined Intelligence for Professional Writing. Build bulletproof tone templates and automate your daily business copy with peace of mind.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#cbd5e1]/70">
              <Sparkles className="w-4 h-4 shrink-0 text-secondary-teal" />
              <span>Standard compliance • Trusted worldwide</span>
            </div>
          </div>

          {/* Nav: Product */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-secondary-teal">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  className="text-sm text-white/70 hover:text-white transition-colors hover:underline decoration-secondary-teal decoration-2 underline-offset-4" 
                  href="#features"
                  onClick={(e) => handleNavClick(e, "#features")}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  className="text-sm text-white/70 hover:text-white transition-colors hover:underline decoration-secondary-teal decoration-2 underline-offset-4" 
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, "#pricing")}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  className="text-sm text-white/70 hover:text-white transition-colors hover:underline decoration-secondary-teal decoration-2 underline-offset-4" 
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, "#how-it-works")}
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: Legal */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-secondary-teal">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer hover:underline decoration-secondary-teal decoration-2 underline-offset-4">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer hover:underline decoration-secondary-teal decoration-2 underline-offset-4">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer hover:underline decoration-secondary-teal decoration-2 underline-offset-4">
                  Data Protection
                </span>
              </li>
            </ul>
          </div>

          {/* Nav: Connect */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#cbd5e1]/40">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a className="text-sm text-white/70 hover:text-white transition-colors hover:underline decoration-secondary-teal decoration-2 underline-offset-4" href="mailto:support@polishai.com">
                  Contact Support
                </a>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer hover:underline decoration-secondary-teal decoration-2 underline-offset-4">
                  Twitter
                </span>
              </li>
              <li>
                <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer hover:underline decoration-secondary-teal decoration-2 underline-offset-4">
                  LinkedIn
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 text-center sm:text-left">
          <p className="text-xs text-white/50">
            © 2026 Polish AI. All rights reserved. Refined Intelligence for Professional Writing.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 select-none">
            <span>Server Location: Global</span>
            <span>•</span>
            <span>Local Standard Time Applied</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
