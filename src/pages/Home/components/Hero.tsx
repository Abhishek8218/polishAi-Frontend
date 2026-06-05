import React from "react";
import { Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import LottieLib from 'lottie-react';
import heroAnimation from "../../../assets/polishHero.json";

const Lottie = (LottieLib as any).default ?? LottieLib;

interface HeroProps {
  onSwitchView?: (view: "landing" | "login" | "signup" | "forgot_password") => void;
}

export default function Hero({ onSwitchView }: HeroProps) {
  const handleSignUpClick = () => {
    if (onSwitchView) {
      onSwitchView("signup");
    } else {
      window.location.hash = "#signup";
    }
  };

  const handleScrollToPlayground = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative overflow-hidden bg-section dot-pattern pt-16 md:pt-24 md:pb-32 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8 items-center">

        {/* Hero Left Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 md:col-span-6 order-2 md:order-1"  // ✅ fix 2: text always first on mobile
        >
          <div className="inline-flex items-center gap-1.5 bg-[#003b35] text-[#8cf5e4] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-secondary-teal animate-pulse" />
            Empowering modern writing workflows
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Write Less. <br />
            <span className="text-secondary-teal">Communicate More.</span>
          </h1>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Polish AI transforms your rough drafts into polished, professional content — using smart, reusable Frameworks you build once and use forever.
          </p>

          {/* ✅ fix 3: full-width buttons on mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
            <button
              onClick={handleSignUpClick}
              className="w-full sm:w-auto bg-secondary-teal text-white hover:bg-[#004d46] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm hover:shadow-lg hover:shadow-secondary-teal/20 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
            >
              Start for Free
            </button>
            <a
              href="#how-it-works"
              onClick={handleScrollToPlayground}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3.5 border border-outline-variant/20 rounded-lg hover:bg-[#16133c] hover:border-secondary-teal/30 transition-all group"
            >
              <Play className="w-4 h-4 text-secondary-teal scale-95 group-hover:scale-105 transition-transform" />
              See how it works
            </a>
          </div>

          {/* ✅ fix 4: trust bar wraps on narrow screens */}
          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-on-surface-variant/70 border-t border-outline-variant/10">
            <div className="flex items-center gap-1 select-none">
              <span className="font-bold text-secondary-teal">✓</span> No credit card required
            </div>
            <div className="flex items-center gap-1 select-none">
              <span className="font-bold text-secondary-teal">✓</span> Standard Free tier included
            </div>
          </div>
        </motion.div>

        {/* Hero Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative md:col-span-6 flex justify-center animate-float order-2 md:order-2"  // ✅ fix 2 + 5
        >
          <div className="relative flex justify-center items-center w-full max-w-lg md:max-w-none">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary-teal/10 to-[#262175]/10 rounded-2xl blur-xl opacity-70 -z-10"></div>
            {/* ✅ fix 1: fluid width, no fixed 400px on mobile */}
            <Lottie
              animationData={heroAnimation}
              loop={true}
              className="w-full max-w-[400px] md:max-w-none"
            />
          </div>
        </motion.div>

      </div>
    </header>
  );
}