import { LogOut, Settings, UserCircle } from "lucide-react";
import PopoverDropdown, {
  type DropdownOption,
} from "../../../shared/components/ui/PopoverDropdown";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../Auth/services/auth.service";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../services/api/endPoints";
import ConfirmationModal from "../../../shared/components/ui/ConfirmationModel";
import { useState } from "react";
import { useAuthStore } from "../../../store/auth";
import { getInitials } from "../../../shared/helpers/getInitials";
import CreditsTimer from "../../../shared/components/ui/CreditResetTimer";

interface TopBarProps {
  onMenuToggle: () => void;
}

const BellIcon = () => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const profileOptions: DropdownOption[] = [
  {
    label: "View Profile",
    value: "profile",
    icon: <UserCircle size={18} />,
  },
  {
    label: "Settings",
    value: "settings",
    icon: <Settings size={18} />,
  },
  {
    label: "Logout",
    value: "logout",
    icon: <LogOut size={18} />,
  },
];

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user =  useAuthStore(state => state.user);
  // TanStack Query Mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");      
      navigate(API_ENDPOINTS.AUTH.LOGIN);  
    },
    onError: (error: any) => {
      console.error("login failed:", error);
    },
  });

  const handleProfileAction = (value: string) => {
    if (value === "profile") {
      console.log("Navigate to Profile");
    } else if (value === "settings") {
      console.log("Navigate to Settings");
    } else if (value === "logout") {
        setShowLogoutModal(true);
    }
  };


const handleLogoutConfirm = () => {
  logoutMutation.mutate();
  setShowLogoutModal(false);
};

  return (
    <header className="flex items-center justify-between h-14 px-5 lg:px-8 bg-[#18181a] border-b border-[#2a2a2e] shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-[#6b6b7e] hover:text-white transition-colors p-1 -ml-1"
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        
      </div>

      <div className="flex items-center gap-4">
        {/* Credits badge */}
       <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-[#222226] border border-[#2e2e38]">
  {user?.creditsRemaining === 0 &&
  user?.creditsResetDate ? (
    <span className="text-[11px] font-semibold tracking-[0.7px] uppercase">
      <span className="text-red-400">
        0 Credits
      </span>

      <span className="mx-2 text-[#4a4a57]">
        •
      </span>

      <span className="text-[#ffb86c]">
        Resets in{" "}
        <CreditsTimer
          resetDate={user.creditsResetDate}
        />
      </span>
    </span>
  ) : (
    <span className="text-[11px] font-semibold tracking-[0.7px] text-[#8b8b9e] uppercase">
      Credits:{" "}
      <span className="text-[#c8c5f8]">
        {user?.creditsRemaining} remaining
      </span>
    </span>
  )}
</div>

        {/* Bell */}
        <button className="relative text-[#5c5c6e] hover:text-[#a0a0b4] transition-colors">
          <BellIcon />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#8b87f0]" />
        </button>

        {/* Avatar */}

        <PopoverDropdown
          options={profileOptions}
          onSelect={handleProfileAction}
          menuWidth="w-56"
          className="border-none bg-transparent hover:bg-transparent p-1"
          trigger={
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a3fc8] to-[#2e2899] border border-[#4a3fc8]/50 flex items-center justify-center hover:cursor-pointer">
              <span className="text-white text-[14px] font-medium">{getInitials(user?.fullName || "")}</span>
            </div>
          }
        />
      </div>
      <ConfirmationModal
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      onConfirm={() => {
        console.log("User logged out");
        handleLogoutConfirm();
      }}
      title="Logout?"
      message="Are you sure you want to logout? You will need to sign in again to access your workspace."
      variant="danger"
      confirmText="Yes, Logout"
    />
    </header>
  );
}
