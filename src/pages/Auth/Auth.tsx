import React, { useState } from "react";
import {
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type AuthView = "login" | "signup" | "forgot_password";

export default function Auth() {
  const [view, setView] = useState<AuthView>("login");

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginTerms, setLoginTerms] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup States
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Forgot Password States
  const [forgotEmail, setForgotEmail] = useState("");

  // Notifications
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      triggerNotification("error", "Please fill in all fields.");
      return;
    }
    if (!loginTerms) {
      triggerNotification("error", "You must agree to the Terms & Conditions.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerNotification("success", `Successfully logged in as ${loginEmail}!`);
      setTimeout(() => { window.location.href = "/"; }, 1500);
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !signupConfirmPassword) {
      triggerNotification("error", "Please fill in all fields.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      triggerNotification("error", "Passwords do not match.");
      return;
    }
    if (signupPassword.length < 6) {
      triggerNotification("error", "Password must be at least 6 characters.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerNotification("success", `Account successfully created for ${signupEmail}!`);
      setView("login");
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!forgotEmail) {
      triggerNotification("error", "Please provide your email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerNotification("success", `Password reset instructions sent to ${forgotEmail}.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0a25] text-white overflow-hidden relative">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* RADIAL LIGHT */}
      <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-1 flex-col justify-between px-20 py-14 relative">
          {/* TOP */}
          <div>
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-[#14b8a6]" />
              PolishAI Workspace
            </div>

            <div className="mt-16 max-w-2xl">
              <h1 className="text-6xl leading-[1.05] tracking-[-0.04em] font-semibold">
                Write faster.
                <br />
                Think clearer.
                <br />
                Publish smarter.
              </h1>

              <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-xl">
                A refined AI writing environment crafted for creators,
                marketers, founders, and modern teams.
              </p>
            </div>

            {/* FEATURE LIST */}
            <div className="mt-16 space-y-5">
              {[
                "AI-powered writing refinement",
                "One workspace for every writing flow",
                "Fast, distraction-free experience",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#14b8a6]" />
                  <p className="text-white/70 text-sm tracking-wide">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ABSTRACT SHAPES */}
          <div className="absolute top-24 right-20 w-40 h-40 rounded-full border border-white/[0.05]" />
          <div className="absolute bottom-32 right-32 w-20 h-20 rotate-12 rounded-3xl border border-white/[0.05]" />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[580px] flex items-center justify-center px-6 py-10 relative">
          <div className="w-full max-w-md relative">
            {/* CARD */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-3xl shadow-2xl p-8 md:p-10">
              {/* VERTICAL ACCENT */}
              <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#14b8a6]/50 to-transparent" />

              {/* GO BACK */}
              <button
                type="button"
                onClick={() => view !== "login" ? setView("login") : window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {view !== "login" ? "Back to Sign In" : "Back"}
              </button>

              {/* NOTIFICATION */}
              {notification && (
                <div
                  className={`mt-6 flex gap-3 rounded-2xl border p-4 ${
                    notification.type === "success"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/20 bg-red-500/10 text-red-300"
                  }`}
                >
                  {notification.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <p className="text-sm leading-relaxed">{notification.message}</p>
                </div>
              )}

              {/* ── LOGIN VIEW ── */}
              {view === "login" && (
                <>
                  <div className="mt-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/30">
                      Welcome Back
                    </p>
                    <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] font-semibold">
                      Sign In
                    </h2>
                    <p className="mt-4 text-white/45 text-sm leading-relaxed">
                      Continue your writing workflow with AI-powered assistance.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="mt-10 space-y-5">
                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25] border border-white/[0.04] pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40 "
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs uppercase tracking-[0.2em] text-white/35">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setView("forgot_password")}
                          className="text-xs text-white/40 hover:text-[#14b8a6]"
                        >
                          Forgot Password
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25] border border-white/[0.04] pl-12 pr-12 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40 "
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* TERMS */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginTerms}
                        onChange={(e) => setLoginTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent"
                      />
                      <span className="text-sm text-white/45">
                        I agree to the Terms & Conditions
                      </span>
                    </label>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl bg-white text-black font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? "Authenticating..." : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-white/40">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setView("signup")}
                        className="text-white hover:text-[#14b8a6] hover:cursor-pointer"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </>
              )}

              {/* ── SIGNUP VIEW ── */}
              {view === "signup" && (
                <>
                  <div className="mt-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/30">
                      Get Started
                    </p>
                    <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] font-semibold">
                      Create Account
                    </h2>
                    <p className="mt-4 text-white/45 text-sm leading-relaxed">
                      Join thousands of creators already using PolishAI.
                    </p>
                  </div>

                  <form onSubmit={handleSignupSubmit} className="mt-10 space-y-5">
                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25] border border-white/[0.04] pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40"
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25] border border-white/[0.04] pl-12 pr-12 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40 "
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="password"
                          required
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25] border border-white/[0.04] pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40 "
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className=" hover:cursor-pointer w-full h-14 rounded-2xl bg-white text-black font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-white/40">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-white hover:text-[#14b8a6]"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </>
              )}

              {/* ── FORGOT PASSWORD VIEW ── */}
              {view === "forgot_password" && (
                <>
                  <div className="mt-10">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/30">
                      Account Recovery
                    </p>
                    <h2 className="mt-4 text-5xl leading-none tracking-[-0.05em] font-semibold">
                      Reset Password
                    </h2>
                    <p className="mt-4 text-white/45 text-sm leading-relaxed">
                      Enter your email and we'll send you instructions to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleForgotSubmit} className="mt-10 space-y-5">
                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full h-14 rounded-2xl bg-[#0d0a25]  border border-white/[0.04] pl-12 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#14b8a6]/40"
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl hover:cursor-pointer bg-white text-black font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-white/40">
                      Remembered your password?{" "}
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-white hover:text-[#14b8a6] hover:cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}