import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './components/features/dashboard/Dashboard';
import ErrorPage from './components/features/error-page/Error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
