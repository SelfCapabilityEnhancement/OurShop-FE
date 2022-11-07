import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/features/error-page/Error-page';
import CreateProduct from '../components/features/create-product/CreateProduct';
import ShoppingCart from '../components/features/shopping-cart/ShoppingCart';
import MyOrder from '../components/features/my-order/MyOrder';
import HomePage from '../components/features/home-page/HomePage';
import MyWallet from '../components/features/my-wallet/MyWallet';
import PurchaseConfirmation from '@/components/features/purchase-confirmation/PurchaseConfirmation';
import DetailPage from '@/components/features/detail-page/DetailPage';
import OrderManagement from '@/components/features/order-management/OrderManagement';
import MyInformation from '@/components/features/my-information/MyInformation';
import ProductManagement from '@/components/features/product-management/ProductManagement';

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
      {
        path: 'my-wallet',
        element: <MyWallet />,
      },
      {
        path: 'purchase-confirmation',
        element: <PurchaseConfirmation />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'order-management',
        element: <OrderManagement />,
      },
      {
        path: 'my-information',
        element: <MyInformation />,
      },
      {
        path: 'product-management',
        element: <ProductManagement />,
      },
    ],
  },
]);
