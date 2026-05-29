import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function AuthFormLayout({
  title,
  subtitle,
  backTo,
  notification,
  children,
}: {
  title: string;
  subtitle: string;
  backTo: string;
  notification: any;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d0a25] text-white overflow-hidden relative">
      {/* Background elements (same as before) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex">
        {/* Left Marketing Panel - Same as your original */}
        <div className="hidden lg:flex flex-1 flex-col justify-between px-20 py-14 relative">
          {/* ... (copy your left side content here) */}
          <div>
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-[#14b8a6]" />
              PolishAI Workspace
            </div>

            <div className="mt-16 max-w-2xl">
              <h1 className="text-6xl leading-[1.05] tracking-[-0.04em] font-semibold">
                Write faster.<br />
                Think clearer.<br />
                Publish smarter.
              </h1>
              <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-xl">
                A refined AI writing environment crafted for creators, marketers, founders, and modern teams.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-[580px] flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-3xl shadow-2xl p-8 md:p-10">
              <button
                onClick={() => window.location.href = backTo}
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {notification && (
                <div className={`mt-6 flex gap-3 rounded-2xl border p-4 ${notification.type === "success"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}>
                  {notification.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <p className="text-sm">{notification.message}</p>
                </div>
              )}

              <div className="mt-10">
                <p className="text-sm uppercase tracking-[0.3em] text-white/30">PolishAI</p>
                <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] font-semibold">{title}</h2>
                <p className="mt-4 text-white/45 text-sm leading-relaxed">{subtitle}</p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}