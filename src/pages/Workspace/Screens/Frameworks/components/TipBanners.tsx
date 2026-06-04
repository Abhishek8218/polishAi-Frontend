import React from 'react'
import { Lightbulb, Wand2 } from 'lucide-react'

const TipBanners = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Variable Injection tip */}
      <div className="rounded-xl bg-primary-container border border-primary-indigo/20 p-5 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-lg bg-primary-indigo/20 flex items-center justify-center shrink-0">
          <Lightbulb size={18} className="text-on-primary-container" />
        </div>
        <div>
          <p className="font-semibold text-on-primary-container text-[14px]">
            AI Tip: Variable Injection
          </p>
          <p className="text-[13px] text-on-primary-container/70 mt-1 leading-relaxed">
            Use [TARGET_AUDIENCE] in your frameworks to let the AI auto-adapt its tone for different
            readers instantly.
          </p>
        </div>
      </div>

      {/* Optimize Prompt tip */}
      <div className="rounded-xl bg-secondary-container border border-secondary-teal/20 p-5 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-lg bg-secondary-teal/20 flex items-center justify-center shrink-0">
          <Wand2 size={18} className="text-on-secondary-container" />
        </div>
        <div>
          <p className="font-semibold text-on-secondary-container text-[14px]">
            Optimize Your Prompt
          </p>
          <p className="text-[13px] text-on-secondary-container/70 mt-1 leading-relaxed">
            Our AI can analyze your current frameworks and suggest refinements to reduce word count
            by up to 15%.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TipBanners