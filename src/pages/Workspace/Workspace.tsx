import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

// Import all section components
import PolishSection from "./Screens/Polish/PolishSection";
import Frameworks from "./Screens/Frameworks/Frameworks";
import { useCurrentUser } from "../../shared/hooks/useCurrentUser";
import { useAuthStore } from "../../store/auth";
import History from "./Screens/History/History";
import ComingSoon from "../../shared/components/ui/ComingSoon";

export type NavItem =
  | "Polish"
  | "Frameworks"
  | "History"
  | "Subscription"
  | "Settings";

const navToPath: Record<NavItem, string> = {
  Polish: "polish",
  Frameworks: "frameworks",
  History: "history",
  Subscription: "subscription",
  Settings: "settings",
};

export default function Workspace() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user } = useCurrentUser();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
   
    if (user) {
      setUser(user);
    }
  
  }, [user, setUser]);

  // Get current active nav from URL
  const getActiveNavFromPath = (): NavItem => {
    const path = location.pathname.split("/").pop()?.toLowerCase();
    if (path === "polish") return "Polish";
    if (path === "frameworks") return "Frameworks";
    if (path === "history") return "History";
    if (path === "subscription") return "Subscription";
    if (path === "settings") return "Settings";
    return "Polish"; // default
  };
  const activeNav = getActiveNavFromPath();

  const handleNavChange = (item: NavItem) => {
    navigate(`/workspace/${navToPath[item]}`);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#111110] font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden lg:pl-[240px]">
        <TopBar onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex flex-1 overflow-x-hidden">
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <Routes>
              <Route path="polish" element={<PolishSection />} />
              <Route path="frameworks" element={<Frameworks />} />
              <Route path="history" element={<History />} />
              <Route
                path="subscription"
                element={
                  <ComingSoon
                    title="Subscription Management"
                    description="Manage billing, plans, invoices and credit usage."
                  />
                }
              />
              <Route
                path="settings"
                element={
                  <ComingSoon
                    title="Settings"
                    description="Customize your profile, security and notifications."
                  />
                }
              />
              <Route path="*" element={<PolishSection />} /> {/* fallback */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
