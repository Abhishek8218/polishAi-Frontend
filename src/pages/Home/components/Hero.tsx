import React from "react";
import { Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import LottieLib from 'lottie-react';



import heroAnimation from "../../../assets/polishHero.json";


// Unwrap if bundler gives you the module object
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
console.log(heroAnimation);
  return (
    <header className="relative overflow-hidden bg-section dot-pattern pt-16 md:pt-24 pb-24 md:pb-32 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8 items-center">
        {/* Hero Left Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 md:col-span-6"
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
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleSignUpClick}
              className="bg-secondary-teal text-white hover:bg-[#004d46] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm hover:shadow-lg hover:shadow-secondary-teal/20 hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
            >
              Start for Free
            </button>
            <a
              href="#how-it-works"
              onClick={handleScrollToPlayground}
              className="flex items-center gap-2 text-white font-sans font-semibold text-sm px-6 py-3.5 border border-outline-variant/20 rounded-lg hover:bg-[#16133c] hover:border-secondary-teal/30 transition-all group"
            >
              <Play className="w-4 h-4 text-secondary-teal scale-95 group-hover:scale-105 transition-transform" />
              See how it works
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-on-surface-variant/70 border-t border-outline-variant/10">
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
          className="relative md:col-span-6 flex justify-center animate-float animate-float"
        >
          <div className="relative flex justify-center items-center w-full max-w-lg md:max-w-none">
            {/* Soft decorative glow backdrops */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary-teal/10 to-[#262175]/10 rounded-2xl blur-xl opacity-70 -z-10"></div>
            {/* <img
              alt="Illustration of a professional using Polish AI to refine content"
              className="w-full h-auto drop-shadow-2xl rounded-xl border border-outline-variant/10 opacity-90"
     
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMrz1e-ikgy6UUeksEkvKx61qTlh2mXqefmmFlzfpFuK8EJddrJksuAWDpjRO0oHdRncnTCGZa9JeXlfdFAAhNVx4KYELwu2qFjfvRNL-Ti4sG2mOWOy9cd2jR1zW9D8tRu8ge37StZD0pop_Puk4nJDfS0ARobRYvvZc0R3yEKQWFDmNIUgWupLyz8oWOgIc5m55tZSjv-hZl9yCxQe_qFrKk0GoHuTx7V2IR3NqRSrM7v7z4c_5SBnEJUY1-1pc0gmxZjOjka-4"
              referrerPolicy="no-referrer"
            /> */}
            <Lottie
        animationData={heroAnimation}
        loop={true}
        className="w-[400px] max-w-full"
      />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
