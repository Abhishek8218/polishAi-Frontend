import { useMutation } from '@tanstack/react-query';

import * as authService from '../services/auth.service';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};