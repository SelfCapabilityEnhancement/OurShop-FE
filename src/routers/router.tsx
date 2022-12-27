import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '../components/features/error-page/ErrorPage';
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
import LoginPage from '@/components/features/login-page/LoginPage';
import RegisterPage from '@/components/features/register-page/RegisterPage';
import App from '@/App';
import AccountManagement from '@/components/features/account-management/AccountManagement';
import FeatureTable from '@/components/features/account-management/components/FeatureTable/FeatureTable';
import RoleTable from '@/components/features/account-management/components/RoleTable/RoleTable';
import AccountListTable from '@/components/features/account-management/AccountListTable';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
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
      {
        path: 'account-management',
        element: <AccountManagement />,
        children: [
          {
            path: '',
            element: <AccountListTable />,
          },
          {
            path: 'account-list',
            element: <AccountListTable />,
          },
          {
            path: 'function-configuration',
            element: <FeatureTable />,
          },
          {
            path: 'role-configuration',
            element: <RoleTable />,
          },
        ],
      },
    ],
  },
]);
