import { ConfigProvider, ConfigProviderProps } from 'antd';
import { ReactNode } from 'react';

interface ModalThemeProviderProps {
  children: ReactNode;
}

export const ModalThemeProvider = ({ children }: ModalThemeProviderProps) => {
  const themeConfig: ConfigProviderProps = {
    theme: {
      components: {
        Form: {
          labelColor: '#232323',
          labelFontSize: 18,
        },
        Input: {
          inputFontSize: 18,
          paddingBlock: 14,
          paddingInline: 16,
          borderRadius: 12,
        },
        Modal: {
          titleFontSize: 20,
        },
      },
    },
  };

  return <ConfigProvider {...themeConfig}>{children}</ConfigProvider>;
};
