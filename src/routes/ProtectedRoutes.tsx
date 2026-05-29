import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api/axios';
import { API_ENDPOINTS } from '../services/api/endPoints';

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to={API_ENDPOINTS.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;