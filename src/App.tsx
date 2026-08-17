import { Analytics } from '@vercel/analytics/react';
import { AppRouter } from './routes/AppRouter';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AppRouter />
      <Analytics />
    </ToastProvider>
  );
}

export default App;
