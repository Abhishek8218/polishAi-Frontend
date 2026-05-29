import { Repeat, Ban, RefreshCw, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "../../../shared/utils/shared.const";

export default function ProblemLoop() {
  return (
    <section id="problem" className="py-24 bg-[#0d0a25] dot-pattern relative overflow-hidden border-b border-outline-variant/10">
      {/* Visual background accents */}
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-secondary-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-secondary-teal/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">

  <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-[#1D9E75]" />
              <span className="uppercase tracking-[0.2em] text-[#1D9E75] font-bold text-[10px] font-sans">
                THE FRICTION LOOP
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight"
            >
              Your current workflow is breaking your{" "}
              <span className="text-secondary-teal">momentum.</span>
            </motion.h2>
          </div>

        </div>

        

        {/* Workflow Path Structure */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Connecting Workflow Line (Desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-secondary-teal/25 -translate-x-1/2 hidden md:block"></div>

          {/* Problem 1 - Repeating Yourself */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-start mb-20 md:mb-24 group">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right">
              <span className="inline-flex py-1 px-3 bg-red-950/40 border border-red-900/30 text-red-300 rounded-full text-xs font-semibold mb-2 md:mb-3">
                Issue 01
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                Repeating yourself
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Typing instructions into AI over and over for every email, report, or post.
              </p>
            </div>

            {/* Pivot Connection Dot */}
            <div className="my-6 md:my-0 relative z-10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border-2 border-[#006A60] flex items-center justify-center text-[#006A60] group-hover:bg-[#006A60] group-hover:text-white transition-all duration-300 shadow-sm">
                <Repeat className="w-5 h-5 text-secondary-teal group-hover:text-white  transition-all duration-300 " />
              </div>

            </div>

            <div className="md:w-1/2"></div>
          </div>

          {/* Problem 2 - Inconsistent Output */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-end mb-20 md:mb-24 group">
            <div className="md:w-1/2"></div>

            {/* Pivot Connection Dot */}
            <div className="my-6 md:my-0 relative z-10 flex items-center justify-center">


              <div className="w-12 h-12 rounded-full bg-surface-container border-2 border-[#006A60] flex items-center justify-center text-[#006A60] group-hover:bg-[#006A60] group-hover:text-white transition-all duration-300 shadow-sm">
                <Ban className="w-5 h-5 text-secondary-teal  group-hover:text-white  transition-all duration-300 " />
              </div>
            </div>

            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <span className="inline-flex py-1 px-3 bg-red-950/40 border border-red-900/30 text-red-300 rounded-full text-xs font-semibold mb-2 md:mb-3">
                Issue 02
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                Inconsistent output
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Wrestling with AI that sounds like a robot one minute and too casual the next.
              </p>
            </div>
          </div>

          {/* Problem 3 - Context Switching */}
          <div className="relative flex flex-col md:flex-row items-center md:justify-start group">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right">
              <span className="inline-flex py-1 px-3 bg-red-950/40 border border-red-900/30 text-red-300 rounded-full text-xs font-semibold mb-2 md:mb-3">
                Issue 03
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                Context switching
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Jumping between tools to find the right prompt for the task.
              </p>
            </div>

            {/* Pivot Connection Dot */}
            <div className="my-6 md:my-0 relative z-10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border-2 border-[#006A60] flex items-center justify-center text-[#006A60] group-hover:bg-[#006A60] group-hover:text-white transition-all duration-300 shadow-sm">
                <RefreshCw className="w-5 h-5 text-secondary-teal  group-hover:text-white  transition-all duration-300 " />
              </div>

            </div>

            <div className="md:w-1/2"></div>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="mt-16 max-w-2xl mx-auto bg-amber-950/30 border border-amber-900/40 rounded-xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans font-semibold text-sm text-amber-200">
              The continuous correction cycle drains your cognitive load
            </h4>
            <p className="text-xs text-amber-400 mt-1 leading-relaxed">
              Professionals spend up to 4.5 hours a week simply checking and modifying generative outputs because of mismatched brand-voice rules or custom guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
