import { useState } from 'react';

import { getAccessToken } from '@/utils/token-storage';

export const useAuth = () => {
  const [isAuthorized] = useState<boolean>(() => {
    return !!getAccessToken();
  });

  return { isAuthorized };
};
