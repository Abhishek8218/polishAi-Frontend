import { Sparkles, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import AuthFormInput from "../../../shared/components/auth/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { loginSchema, type TLoginFormData } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../services/api/endPoints";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient =useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema), // ← Connect Zod
    mode: "onChange",
  });

  // TanStack Query Mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      const userData = data.data;

      if (userData?.accessToken) {
        localStorage.setItem("accessToken", userData.accessToken);
      }
      if (userData?.refreshToken) {
        localStorage.setItem("refreshToken", userData.refreshToken);
      }

      // Optional: Save user data if returned
      if (userData?.user) {
        localStorage.setItem("user", JSON.stringify(userData.user));
      }

      reset();
      toast.success("Login successful");
      // Redirect to dashboard (or home)
       queryClient.invalidateQueries({ queryKey: ['current-user'] });
      navigate(API_ENDPOINTS.WORKSPACE); // Change this to your actual dashboard route
    },
    onError: (error: any) => {
      console.error("login failed:", error);
      if (error?.response?.status === 401) {
        toast.error("Please check your email and password");
      }
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const handleloginSubmit = (data: TLoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
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
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {"Back"}
              </button>
              {/* ── login VIEW ── */}
              {
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

                  <form
                    onSubmit={handleSubmit(handleloginSubmit)}
                    className="mt-10 space-y-5"
                  >
                    <AuthFormInput<TLoginFormData>
                      type="email"
                      label="Email Address"
                      name="email"
                      register={register}
                      placeholder="you@example.com"
                      error={errors.email}
                    />

                    <AuthFormInput<TLoginFormData>
                      type="password"
                      label="Password"
                      name="password"
                      register={register}
                      placeholder="Min. 8 characters"
                      error={errors.password}
                    />

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full h-14 rounded-2xl bg-white text-black font-semibold text-sm 
                     transition-all hover:scale-[1.01] active:scale-[0.99] 
                     disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                      {loginMutation.isPending
                        ? "Authenticating..."
                        : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-white/40">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          navigate(API_ENDPOINTS.AUTH.REGISTER);
                        }}
                        className="text-white hover:text-[#14b8a6]"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
