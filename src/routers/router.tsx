import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/features/error-page/Error-page';
import CreateProduct from '../components/features/create-product/CreateProduct';
import ShoppingCart from '../components/features/shopping-cart/ShoppingCart';
import MyOrder from '../components/features/my-order/MyOrder';
import HomePage from '../components/features/home-page/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'create-product',
        element: <CreateProduct />,
      },
      {
        path: 'shopping-cart',
        element: <ShoppingCart />,
      },
      {
        path: 'my-order',
        element: <MyOrder />,
      },
    ],
  },
]);
