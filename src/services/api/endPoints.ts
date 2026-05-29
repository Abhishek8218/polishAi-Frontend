export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',

  },

  WORKSPACE : "/workspace",

  FRAMEWORKS: {
    LIST: '/frameworks',
    CREATE: '/frameworks',
    UPDATE: (id: string) => `/frameworks/${id}`,
    DELETE: (id: string) => `/frameworks/${id}`,
  },

  POLISH: {
    CREATE: '/polish',
  },

  HISTORY: {
    LIST: '/history',
  },

  SUBSCRIPTION: {
    CURRENT: '/subscription',
    BILLING_HISTORY: '/subscription/billing-history',
  },
} as const;