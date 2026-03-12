export const saveAccessToken = (token: string, remember: boolean): void => {
  if (remember) {
    localStorage.setItem('accessToken', token);
  } else {
    sessionStorage.setItem('accessToken', token);
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};
