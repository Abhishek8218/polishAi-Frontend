import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface CTAProps {
  onSwitchView?: (view: "landing" | "login" | "signup" | "forgot_password") => void;
}

export default function CTA({ onSwitchView }: CTAProps) {
  const handleSignUpClick = () => {
    if (onSwitchView) {
      onSwitchView("signup");
    } else {
      window.location.hash = "#signup";
    }
  };

  return (
    <section id="cta" className="py-24 bg-[#050412] text-white overflow-hidden relative border-t border-outline-variant/10">
              
      {/* Decorative tiny grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      {/* Absolute Background Accent Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary-teal/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center relative z-10 space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8cf5e4]" />
          No Credit Card Required • Try the Simulator above
        </motion.div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
          Start polishing your writing today.
        </h2>
        
        <p className="text-white/80 font-sans text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Join 10,000+ professionals who have stopped wrestling with generic AI prompts and started writing with absolute, reproducible brand voice.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleSignUpClick}
            className="w-full sm:w-auto bg-secondary-teal hover:bg-[#004d46] text-white font-sans font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-secondary-teal/20 transition-all active:scale-95 cursor-pointer"
          >
            Create Free Account
          </button>
          <a
            href="#pricing"
            className="w-full sm:w-auto text-white/90 hover:text-white font-sans font-semibold text-sm px-6 py-3 border border-white/20 hover:border-white/50 rounded-lg hover:bg-white/5 transition-all text-center"
          >
            View Pricing Plans
          </a>
        </div>

        <p className="text-[11px] text-white/50 pt-2">
          By signing up, you agree to our Terms of Use and privacy guidelines. Credits do not expire.
        </p>

      </div>
    </section>
  );
}
