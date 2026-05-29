import React, { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../../../services/api/endPoints";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (isAuthPage) {
      e.preventDefault();

      navigate(`/${hash}`);

      setTimeout(() => {
        const element = document.querySelector(hash);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    }

    setIsOpen(false);
  };

  return (
    <nav className="bg-[#0a081d]/85 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10 transition-all">
      <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-secondary-teal flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            P
          </div>

          <span className="font-sans font-bold text-lg tracking-tight text-white">
            Polish <span className="text-[#8cf5e4]">AI</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#problem"
            onClick={(e) =>
              handleNavClick(e, "#problem")
            }
            className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] transition-colors duration-200"
          >
            The Loop
          </a>

          <a
            href="#how-it-works"
            onClick={(e) =>
              handleNavClick(e, "#how-it-works")
            }
            className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] transition-colors duration-200"
          >
            How It Works
          </a>

          <a
            href="#features"
            onClick={(e) =>
              handleNavClick(e, "#features")
            }
            className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] transition-colors duration-200"
          >
            Features
          </a>

          <a
            href="#pricing"
            onClick={(e) =>
              handleNavClick(e, "#pricing")
            }
            className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] transition-colors duration-200"
          >
            Pricing
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/auth")}
            className="font-sans font-semibold text-sm text-cbd5e1 text-on-surface-variant hover:text-[#8cf5e4] transition-colors focus:outline-none cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate(API_ENDPOINTS.AUTH.REGISTER)}
            className="bg-secondary-teal text-white border border-[#252054] px-5 py-2.5 rounded-full font-sans font-semibold text-sm hover:opacity-90 hover:shadow-md hover:shadow-secondary-teal/20 transition-all active:scale-95 duration-150 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8cf5e4]" />
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-secondary-teal focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 animate-pulse" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              overflow: "hidden",
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
              overflow: "hidden",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden border-t border-outline-variant/10 bg-[#0d0a25]"
          >
            <div className="flex flex-col gap-4 p-6">
              <a
                href="#problem"
                onClick={(e) =>
                  handleNavClick(e, "#problem")
                }
                className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] py-1 transition-colors"
              >
                The Loop
              </a>

              <a
                href="#how-it-works"
                onClick={(e) =>
                  handleNavClick(
                    e,
                    "#how-it-works",
                  )
                }
                className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] py-1 transition-colors"
              >
                How It Works
              </a>

              <a
                href="#features"
                onClick={(e) =>
                  handleNavClick(e, "#features")
                }
                className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] py-1 transition-colors"
              >
                Features
              </a>

              <a
                href="#pricing"
                onClick={(e) =>
                  handleNavClick(e, "#pricing")
                }
                className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] py-1 transition-colors"
              >
                Pricing
              </a>

              <hr className="border-outline-variant/10 my-1" />

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/auth");
                  }}
                  className="font-sans font-semibold text-sm text-[cbd5e1] hover:text-[#8cf5e4] text-center py-2 transition-colors focus:outline-none cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(API_ENDPOINTS.AUTH.REGISTER);
                  }}
                  className="bg-secondary-teal text-white py-3 rounded-lg font-sans font-semibold text-sm text-center hover:opacity-90 transition-all cursor-pointer"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}