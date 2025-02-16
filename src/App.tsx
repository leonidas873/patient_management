import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { useThemeStore } from './store/themeStore';
import { ConfigProvider } from 'antd';
import defaultAlgorithm from 'antd/es/theme/themes/default';
import darkAlgorithm from 'antd/es/theme/themes/dark';

const queryClient = new QueryClient();

function App() {
  const { darkMode } = useThemeStore();
  return (
    <>
      <div
        data-theme={darkMode ? 'dark' : ''}
        className="box-border min-h-screen dark:bg-gray-600"
      >
        <ConfigProvider
          theme={{
            algorithm: darkMode ? darkAlgorithm : defaultAlgorithm
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Router>
              <AppRoutes />
            </Router>
          </QueryClientProvider>
        </ConfigProvider>
      </div>
    </>
  );
}

export default App;
