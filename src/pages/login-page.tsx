import { ConfigProvider } from 'antd';

import { LoginForm } from '@/components';

export const LoginPage = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            inputFontSize: 18,
            paddingBlock: 14,
            paddingInline: 16,
            borderRadius: 12,
          },
          Divider: {
            verticalMarginInline: 0,
            margin: 0,
          },
        },
      }}
    >
      <LoginForm />
    </ConfigProvider>
  );
};
