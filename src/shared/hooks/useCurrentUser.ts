import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../pages/Auth/services/auth.service';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
};