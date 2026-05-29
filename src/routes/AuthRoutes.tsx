import { Navigate, Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';

const AuthRoute = () => {
  // Use lazy initializer to avoid warning
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('accessToken');
  });

  // Optional: Re-check token if localStorage changes (e.g., login/logout in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Still checking (very brief)
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#111110] text-white">
        Loading...
      </div>
    );
  }

  // If user is already logged in → redirect to workspace
  if (isAuthenticated) {
    return <Navigate to="/workspace" replace />;
  }

  // Allow access to login/register
  return <Outlet />;
};

export default AuthRoute;