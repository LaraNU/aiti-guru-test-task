import './App.css';

import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  colorPrimaryHover: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#242EDB',
  colorPrimaryHover: '#367AFF',
};

function App() {
  return (
    <main>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: defaultData.colorPrimary,
            borderRadius: defaultData.borderRadius,
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </main>
  );
}

export default App;
