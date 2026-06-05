import { useState } from "react";
import { Check, X, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "../../../shared/utils/shared.const";

interface PricingProps {
  onSwitchView?: (view: "landing" | "login" | "signup" | "forgot_password") => void;
}

export default function Pricing({ onSwitchView }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (baseMonthly: number) => {
    if (isAnnual) {
      return Math.floor(baseMonthly * 0.8); // 20% discount
    }
    return baseMonthly;
  };

  const handleSelectPlan = () => {
    if (onSwitchView) {
      onSwitchView("signup");
    } else {
      window.location.hash = "#cta";
    }
  };

  return (
    <section id="pricing" className="pt-20 sm:py-20 bg-section dot-pattern border-b border-outline-variant/10 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-indigo/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        

  {/* Header */}
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
                 PRICING
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight"
            >
               Simple, transparent.{" "}
              <span className="text-secondary-teal">pricing.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE_OUT_EXPO }}
            className="text-white/35 text-sm font-sans max-w-xs leading-relaxed hidden md:block text-right"
          >
            No long-term commitments. Scale or down-grade your subscription anytime.
          </motion.p>
        </div>
        {/* Pricing Toggle Switches */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-xs font-bold transition-colors ${!isAnnual ? "text-secondary-teal" : "text-on-surface-variant/70"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-secondary-teal/20 p-1 flex items-center justify-start cursor-pointer focus:outline-none transition-all"
            style={{
              justifyContent: isAnnual ? "flex-end" : "flex-start",
            }}
            aria-label="Toggle annual pricing"
          >
            <motion.div
              layout
              className="w-4 h-4 bg-secondary-teal rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-xs font-bold transition-colors flex items-center gap-1.5 ${isAnnual ? "text-secondary-teal" : "text-on-surface-variant/70"}`}>
            Annual Billing
            <span className="bg-[#003b35] text-[#8cf5e4] px-2 py-0.5 rounded text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card: Free */}
          <div className="bg-[#16133c] p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between h-full hover:shadow-xl hover:border-outline-variant/20 transition-all">
            <div>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant/70 font-sans font-bold">
                Basic Tier
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-1 mb-2">
                Free
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight text-white">$0</span>
                <span className="text-on-surface-variant text-xs font-semibold">/mo</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Perfect for casual writers looking to experience the power of customized prompt rules.
              </p>

              <hr className="border-outline-variant/10 mb-6" />

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant leading-none">3 Custom Frameworks</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant leading-none">10 Polishes per month</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-on-surface-variant/40">
                  <X className="w-4 h-4 text-red-500/80 mt-0.5 shrink-0" />
                  <span className="line-through leading-none">Team Sharing features</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={handleSelectPlan}
              className="w-full py-3 bg-[#0d0a25] border border-outline-variant/20 rounded-lg font-sans font-bold text-sm text-center text-white hover:bg-[#1f1c50] transition-colors cursor-pointer"
            >
              Start Free
            </button>
          </div>

          {/* Card: Pro Plan */}
          <div className="bg-[#16133c] p-8 rounded-xl border-2 border-[#006A60] relative flex flex-col justify-between h-full shadow-2xl transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#006A60] text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3 text-white fill-white" />
              MOST POPULAR
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-secondary-teal font-sans font-bold">
                Professional
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-1 mb-2">
                Pro
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ${calculatePrice(9)}
                </span>
                <span className="text-on-surface-variant text-xs font-semibold">
                  /mo {isAnnual && <span className="text-[10px] block opacity-80">(billed annually)</span>}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                For managers, creators, & consultants crafting daily materials with rigorous style guidelines.
              </p>

              <hr className="border-outline-variant/10 mb-6" />

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-5 h-5 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-white font-semibold leading-none">Unlimited Frameworks</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-5 h-5 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-white font-semibold leading-none">500 Polishes per month</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-5 h-5 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-white font-semibold leading-none">Priority Processing</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSelectPlan}
              className="w-full py-3 bg-[#006A60] text-white hover:opacity-90 rounded-lg font-sans font-bold text-sm text-center hover:shadow-lg hover:shadow-secondary-teal/20 transition-all cursor-pointer"
            >
              Go Pro
            </button>
          </div>

          {/* Card: Business */}
          <div className="bg-[#16133c] p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between h-full hover:shadow-xl hover:border-outline-variant/20 transition-all">
            <div>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant/70 font-sans font-bold">
                Enterprise Scale
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-1 mb-2">
                Business
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ${calculatePrice(29)}
                </span>
                <span className="text-on-surface-variant text-xs font-semibold">
                  /mo {isAnnual && <span className="text-[10px] block opacity-80">(billed annually)</span>}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Engineered for scaling startups, agencies, and businesses looking to automate unified styling guidelines.
              </p>

              <hr className="border-outline-variant/10 mb-6" />

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant leading-none">All Pro Features Included</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant leading-none">Unlimited Polishes</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-[#006A60] mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant leading-none">Team &amp; Domain Management</span>
                </li>
              </ul>
            </div>

            <a
              href="mailto:sales@polishai.com"
              className="w-full py-3 bg-[#0d0a25] border border-outline-variant/20 rounded-lg font-sans font-bold text-sm text-center text-white hover:bg-[#1f1c50] transition-colors block"
            >
              Contact Sales
            </a>
          </div>

        </div>

        {/* Security / FAQ small hint */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-on-surface-variant/70">
          <Shield className="w-4 h-4 text-secondary-teal" />
          <span>SSL Secure checkout. Privacy policy compliant. No custom model training options are standard.</span>
        </div>

      </div>
    </section>
  );
}
