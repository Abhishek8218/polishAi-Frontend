import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/Home/Home";
import { API_ENDPOINTS } from "../services/api/endPoints";
import LoginForm from "../pages/Auth/components/LoginForm";
import RegisterForm from "../pages/Auth/components/SignupForm";
import Workspace from "../pages/Workspace/Workspace";
import AuthRoute from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route element={<AuthRoute />}>
        <Route path={API_ENDPOINTS.AUTH.LOGIN} element={<LoginForm />} />
        <Route path={API_ENDPOINTS.AUTH.REGISTER} element={<RegisterForm />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={API_ENDPOINTS.WORKSPACE + "/*"} element={<Workspace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
