
import api from '../../../services/api/axios';
import { API_ENDPOINTS } from '../../../services/api/endPoints';
import type { TLoginFormData } from '../schemas/login.schema';
import type { TSignupFormData } from '../schemas/signup.schema';

export const login = async (
  payload: TLoginFormData
) => {
  const response = await api.post(
    API_ENDPOINTS.AUTH.LOGIN,
    payload
  );

  return response.data;
};

export const signup = async (
  payload: TSignupFormData
) => {
  const response = await api.post(
    API_ENDPOINTS.AUTH.REGISTER,
    payload
  );

  return response.data;
};

export const logout = async () => {
  const response = await api.post(
    API_ENDPOINTS.AUTH.LOGOUT
  );

  return response.data;
}

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');

  return response.data.data;
};

// export const forgotPassword = async (
//   email: string
// ) => {
//   const response = await api.post(
//     API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
//     { email }
//   );

//   return response.data;
// };