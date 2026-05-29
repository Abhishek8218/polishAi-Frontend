import { Quote } from "lucide-react";
import { motion } from "motion/react";

interface TestimonialCard {
  quote: string;
  name: string;
  role: string;
  initials: string;
  colorClasses: {
    bg: string;
    text: string;
  };
}

const ITEMS: TestimonialCard[] = [
  {
    quote: '"Polish AI cut my email drafting time by 60%. I finally feel confident that my messages are clear and professional without the stress."',
    name: "Sarah Adams",
    role: "Product Manager",
    initials: "SA",
    colorClasses: {
      bg: "bg-[#003b35]",
      text: "text-[#8cf5e4]",
    },
  },
  {
    quote: '"The Frameworks feature is a game-changer. I have one for client reports and one for cold outreach. The consistency is incredible."',
    name: "Marcus King",
    role: "Content Strategist",
    initials: "MK",
    colorClasses: {
      bg: "bg-[#252054]",
      text: "text-[#8cf5e4]",
    },
  },
  {
    quote: '"Finally an AI tool that doesn\'t just \'rewrite\' but actually \'polishes\' based on my specific rules. It\'s my secret weapon."',
    name: "James Lee",
    role: "Executive Director",
    initials: "JL",
    colorClasses: {
      bg: "bg-surface-container-high",
      text: "text-white",
    },
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="uppercase tracking-widest text-secondary-teal font-sans font-bold text-xs bg-secondary-container/10 px-3 py-1 rounded-full">
            REVIEWS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mt-3">
            Trusted by professionals who write every day.
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base mt-2">
            See how designers, managers, and directors around the world leverage custom write rules.
          </p>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#16133c] p-8 rounded-xl border border-outline-variant/10 relative flex flex-col justify-between hover:shadow-xl hover:border-outline-variant/20 transition-all"
            >
              {/* Semi-transparent absolute blockquote style */}
              <Quote className="absolute top-4 right-6 w-10 h-10 text-[#252054]/30 -z-0 pointer-events-none stroke-2" />
              
              <div className="relative z-10">
                <p className="font-sans italic text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                {/* Initials Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs select-none shadow-sm shrink-0 ${item.colorClasses.bg} ${item.colorClasses.text}`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white leading-snug">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant/80">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
