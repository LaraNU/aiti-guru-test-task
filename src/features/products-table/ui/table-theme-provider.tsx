import { ConfigProvider, ConfigProviderProps } from 'antd';
import { ReactNode } from 'react';

interface TableThemeProviderProps {
  children: ReactNode;
}

export const TableThemeProvider = ({ children }: TableThemeProviderProps) => {
  const themeConfig: ConfigProviderProps = {
    theme: {
      token: {
        colorPrimary: '#3c538e',
        colorText: '#161919',
      },
      components: {
        Table: {
          headerBg: '#ffffff',
          headerColor: '#b2b3b9',
          headerSplitColor: '#ffffff',
          rowSelectedBg: 'transparent',
          cellFontSize: 16,
          expandIconBg: 'transparent',
          cellPaddingBlock: 11,
          fontFamily: '"Cairo", sans-serif',
          lineHeight: 1.2,
        },
      },
    },
  };

  return <ConfigProvider {...themeConfig}>{children}</ConfigProvider>;
};
