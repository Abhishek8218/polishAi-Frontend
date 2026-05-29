import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProblemLoop from "./components/ProblemLoop";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle smooth scroll for hash links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;

      if (
        [
          "#cta",
          "#pricing",
          "#how-it-works",
          "#features",
          "#problem",
        ].includes(hash)
      ) {
        setTimeout(() => {
          const element = document.querySelector(hash);

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    handleHash();

    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return (
    <div className="bg-[#0a081d] text-on-surface font-sans antialiased min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Header */}
      <Header />

      {/* Main Routes */}
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route
            path="/"
            element={
              <motion.div
                key="landing-page"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
                <ProblemLoop />
                <HowItWorks />
                <Features />
                <Pricing />
                {/* <Testimonials /> */}
                <CTA />
              </motion.div>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<FallbackRouterRedirect />}
          />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FallbackRouterRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {
      replace: true,
    });
  }, [navigate]);

  return null;
}