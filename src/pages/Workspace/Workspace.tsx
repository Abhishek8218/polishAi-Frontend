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


export type NavItem = "Polish" | "Frameworks" | "History" | "Subscription" | "Settings";

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

  const setUser = useAuthStore(
    (state) => state.setUser
  );

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

  const [activeNav, setActiveNav] = useState<NavItem>(getActiveNavFromPath());

  // Sync URL with activeNav when it changes
  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    const expectedPath = navToPath[activeNav];

    if (currentPath !== expectedPath) {
      navigate(`/workspace/${expectedPath}`, { replace: true });
    }
  }, [activeNav, navigate, location.pathname]);

  // Update activeNav when URL changes (back/forward button)
  useEffect(() => {
    setActiveNav(getActiveNavFromPath());
  }, [location.pathname]);

  const handleNavChange = (item: NavItem) => {
    setActiveNav(item);
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
              <Route path="frameworks" element={<Frameworks/>} />
              <Route path="history" element={<History/>} />
              <Route path="subscription" element={<div>Subscription</div>} />
              <Route path="settings" element={<div>Settings</div>} />
              <Route path="*" element={<PolishSection />} /> {/* fallback */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}