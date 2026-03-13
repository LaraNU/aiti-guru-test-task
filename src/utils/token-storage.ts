export const saveAccessToken = (token: string, remember: boolean): void => {
  if (remember) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('remember', 'true');
    sessionStorage.removeItem('accessToken');
  } else {
    sessionStorage.setItem('accessToken', token);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('remember');
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};
