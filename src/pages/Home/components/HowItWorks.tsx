import { useState, useEffect } from "react";
import { Hammer, Clipboard, Zap, RefreshCw, Sparkles, SlidersHorizontal, Check, AlertCircle, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PolishAiDashboardImage } from "../../../shared/assets/shared.asset";
import { EASE_OUT_EXPO } from "../../../shared/utils/shared.const";

interface FrameworkPreset {
  id: string;
  name: string;
  version: string;
  draftPlaceholder: string;
  defaultPolished: string;
  highlights: string[];
}

const PRESETS: FrameworkPreset[] = [
  {
    id: "saas",
    name: "Modern SaaS",
    version: "v2.1",
    draftPlaceholder: "Needs work. The text is clunky and hard to read. It lacks flow and professional tone. Revisions required.",
    defaultPolished: "Refined copy. The text is clear, concise, and maintains a professional tone with improved readability. Ready for publication.",
    highlights: ["clear", "concise", "professional tone", "improved readability"],
  },
  {
    id: "classic-web",
    name: "Classic Web",
    version: "v1.5",
    draftPlaceholder: "The text is an absolute mess in the professional imitation of standard products. Needs to be stalled with one, and alert / Now, analyze and read and eliminate errors.",
    defaultPolished: "The copy is successfully reconstructed, resolving grammatical inconsistencies while establishing high-clarity positioning. Free of errors and ready to publish.",
    highlights: ["grammatical inconsistencies", "high-clarity positioning", "ready to publish"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    version: "v3.0",
    draftPlaceholder: "Our solutions are kinda good but we need to explain our security is top-notch so high-profile banks buy it. Just make it sound fancy and secure.",
    defaultPolished: "Our enterprise-tier platform guarantees industry-compliant end-to-end security architectures engineered to support high-fidelity financial institutional data integrity.",
    highlights: ["industry-compliant", "end-to-end security architectures", "financial institutional data integrity"],
  },
];

export default function HowItWorks() {
  const [selectedPreset, setSelectedPreset] = useState<FrameworkPreset>(PRESETS[0]);
  const [draftText, setDraftText] = useState(PRESETS[0].draftPlaceholder);
  const [polishedText, setPolishedText] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [toneProfessional, setToneProfessional] = useState(80);
  const [toneDirect, setDirect] = useState(60);

  // Sync draft placeholder when selected preset changes
  useEffect(() => {
    setDraftText(selectedPreset.draftPlaceholder);
    setPolishedText("");
  }, [selectedPreset]);

  const handlePolish = () => {
    setIsPolishing(true);
    setTimeout(() => {
      // Simulate real-time streaming polish output
      setPolishedText(selectedPreset.defaultPolished);
      setIsPolishing(false);
    }, 1200);
  };

  return (
    <section id="how-it-works" className="py-20 bg-section  dot-pattern overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-[#262175] font-sans font-bold text-xs bg-secondary-container/10 px-3 py-1 rounded-full">
           
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 text-white leading-tight">
            
          </h2>
        </div>
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
                        HOW POLISH AI WORKS
                      </span>
                    </motion.div>
        
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: 0.08, ease: EASE_OUT_EXPO }}
                      className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight"
                    >
                     Build a Framework. Paste.{" "}
                      <span className="text-secondary-teal">Polish.</span>
                    </motion.h2>
                  </div>
        
                </div>

        {/* 3 Step Instructions */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 items-start mb-16 relative">
          {/* Subtle connecting lines on desktop */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-outline-variant/10 -z-10"></div>
          
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 bg-[#16133c] rounded-full shadow-lg flex items-center justify-center border border-outline-variant/15 mb-4 transform hover:scale-105 transition-transform duration-200">
              <Hammer className="w-6 h-6 text-secondary-teal" />
            </div>
            <h4 className="font-sans font-bold text-sm text-white mb-1">
              1. Define Framework
            </h4>
            <p className="text-on-surface-variant text-xs sm:text-sm max-w-xs">
              Set your rules, tone sliders, brand descriptors, and custom output goals.
            </p>
          </div>

          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 bg-[#16133c] rounded-full shadow-lg flex items-center justify-center border border-outline-variant/15 mb-4 transform hover:scale-105 transition-transform duration-200">
              <Clipboard className="w-6 h-6 text-secondary-teal" />
            </div>
            <h4 className="font-sans font-bold text-sm text-white mb-1">
              2. Paste Rough Draft
            </h4>
            <p className="text-on-surface-variant text-xs sm:text-sm max-w-xs">
              Dump your messy thoughts, quick emails, bullet points, or raw transcriptions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 bg-secondary-teal rounded-full shadow-lg flex items-center justify-center mb-4 transform hover:scale-105 transition-transform duration-200">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-sans font-bold text-sm text-white mb-1">
              3. One-Click Polish
            </h4>
            <p className="text-on-surface-variant text-xs sm:text-sm max-w-xs">
              Watch Polish AI refine sentences instantly according to your rigid rules.
            </p>
          </div>
        </div>

        {/* Live Interactive Playground Mockup */}
        <div className="bg-[#16133c] rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden mb-16">
          
          {/* Mock App Header Bar */}
          <div className="bg-[#201b52]/50 border-b border-outline-variant/10 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
              </div>
              <div className="h-4 w-[1px] bg-outline-variant/15"></div>
              <span className="font-sans font-bold text-xs text-white tracking-tight uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-secondary-teal shrink-0 animate-pulse" />
                Polish AI App Editor (Simulator)
              </span>
            </div>

            {/* Framework Select dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="framework-select" className="font-sans text-xs font-semibold text-on-surface-variant select-none">
                Active Framework:
              </label>
              <select
                id="framework-select"
                value={selectedPreset.id}
                onChange={(e) => {
                  const found = PRESETS.find((p) => p.id === e.target.value);
                  if (found) setSelectedPreset(found);
                }}
                className="bg-[#0a081d] border border-outline-variant/15 rounded-md px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-secondary-teal focus:border-secondary-teal cursor-pointer"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0a081d]">
                    {p.name} ({p.version})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-12">
            
            {/* Tone Settings Sidebar Panel (Left) */}
            <div className="md:col-span-3 border-r border-outline-variant/10 bg-[#2b256c]/10 p-6 space-y-6">
              <div>
                <h5 className="font-sans font-bold text-xs text-[#8cf5e4] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Configure Rules
                </h5>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  These sliders feed parameters directly back into our model logic.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs text-[#cbd5e1] font-semibold mb-1 select-none">
                    <span>Professionalism</span>
                    <span>{toneProfessional}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={toneProfessional}
                    onChange={(e) => setToneProfessional(Number(e.target.value))}
                    className="w-full accent-secondary-teal cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-[#cbd5e1] font-semibold mb-1 select-none">
                    <span>Directness</span>
                    <span>{toneDirect}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={toneDirect}
                    onChange={(e) => setDirect(Number(e.target.value))}
                    className="w-full accent-secondary-teal cursor-pointer"
                  />
                </div>
              </div>

              {/* Verified Badge */}
              <div className="bg-[#003b35] rounded-l border border-[#006A60]/30 p-3 flex gap-2">
                <Check className="w-4 h-4 text-[#8cf5e4] shrink-0 mt-0.5" />
                <p className="text-[12px] text-white leading-relaxed">
                  Presets optimized for <strong>brand-voice consistency</strong>. Rule engine verified.
                </p>
              </div>
            </div>

            {/* Split Screen Editor Workspace (Draft vs Polish) */}
            <div className="md:col-span-9 grid sm:grid-cols-2 bg-[#0d0a25]">
              
              {/* Rough Draft Panel */}
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-outline-variant/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-sans font-bold text-xs text-red-300 uppercase bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded">
                      Rough Draft
                    </span>
                    <span className="text-[10px] text-on-surface-variant/70">
                      Chars: {draftText.length}
                    </span>
                  </div>
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    placeholder="Type or paste draft..."
                    className="w-full h-40 text-sm font-sans text-white bg-transparent border-0 focus:ring-0 p-0 resize-none focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="text-[10px] text-on-surface-variant/60 flex items-center gap-1 leading-none select-none">
                    <AlertCircle className="w-3.5 h-3.5 text-secondary-teal" />
                    Simulating formatting
                  </span>
                  <button
                    onClick={handlePolish}
                    disabled={isPolishing}
                    className="bg-secondary-teal text-white hover:opacity-90 hover:shadow-lg hover:shadow-secondary-teal/10 text-xs px-4 py-2 rounded-md font-sans font-bold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
                  >
                    {isPolishing ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin text-[#8cf5e4]" />
                        Polishing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-[#8cf5e4]" />
                        Polish Draft
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Polished Copy Output Panel */}
              <div className="p-6 bg-[#16133c]/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-sans font-bold text-xs text-white uppercase bg-[#003b35] border border-secondary-teal/30 px-2 py-0.5 rounded">
                      Polished Output
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70 flex items-center gap-1 select-none">
                      <Sparkles className="w-3.5 h-3.5 text-secondary-teal animate-pulse" />
                      Refined Voice
                    </span>
                  </div>

                  <div className="min-h-40">
                    <AnimatePresence mode="wait">
                      {isPolishing ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center py-10 text-on-surface-variant/60 space-y-2 h-full"
                        >
                          <RefreshCw className="w-8 h-8 animate-spin text-secondary-teal" />
                          <p className="text-xs font-medium animate-pulse text-[#8cf5e4]">
                            Refining syntax & matching framework rules...
                          </p>
                        </motion.div>
                      ) : polishedText ? (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm font-sans text-white leading-relaxed space-y-3"
                        >
                          <p>{polishedText}</p>
                          <div className="flex flex-wrap gap-1.5 pt-4">
                            {selectedPreset.highlights.map((h, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center text-[12px] font-semibold text-[#8cf5e4] bg-[#003b35] border border-secondary-teal/20 px-2 py-0.5 rounded"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex items-center justify-center py-12 text-on-surface-variant/40 text-center text-xs leading-relaxed max-w-xs mx-auto">
                          Click "Polish Draft" to instantly structure and clean up the text.
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <span className="text-[10px] text-secondary-teal font-semibold">
                    Preset: {selectedPreset.name} Rules applied
                  </span>
                  {polishedText && (
                    <button
                      onClick={() => alert("Simulated: Text copied to clipboard!")}
                      className="text-xs text-white hover:text-secondary-teal font-sans font-bold hover:underline transition-colors focus:outline-none cursor-pointer"
                    >
                      <Copy size={16}/>
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Secondary Image Card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 bg-[#16133c]">
          <img
            alt="Interface showing a split screen comparison of a rough draft versus polished AI output"
            className="w-full h-auto object-cover opacity-85"
            // src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpPrkauCc5XVJw1AIHmO-q7URQ0xN5uiZk-zN9Vpte24LzUphwUiFXbXA4VJA3oKiGKOl__6TF8dawG2iIxiI3bhkmtoZlsmLM4WfPbS2BFuOmnP61AX4smSJ5nFXQ802ZpYSuV250GkTxBG_ZhGhRdfd1fpW3XLxuO57ljXYUPv0I68FnRmMHt7TLCPAz4lda4fZx3ZDpGMdWfOQCaF7t89m7-qYDeQ02Z9xufT8_-mx28Hr81PAPfQMmqjI3kI-5Rkj8VKrhlfI"
           src={PolishAiDashboardImage}
            referrerPolicy="no-referrer"
          />
        
        </div>
        
      </div>
    </section>
  );
}
