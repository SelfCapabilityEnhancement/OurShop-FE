import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useEffect } from 'react';
import { getShoppingCarts } from '@/service';
import { useLocation } from 'react-router';
import useGlobalState from '@/state';
import { useLoginStore } from '@/hooks/useLoginStore';
import { isEmpty } from 'lodash';

export default function Header() {
  const navigate = useNavigate();
  const [shoppingCartLength, setShoppingCartLength] =
    useGlobalState('shoppingCartLength');
  const location = useLocation();
  const jwt = useLoginStore((state) => state.jwt);
  const accessiblePaths = useLoginStore((state) => state.accessiblePaths);

  useEffect(() => {
    if (jwt) {
      getShoppingCarts(true).then((items) => {
        setShoppingCartLength(items.length);
      });
    }
  }, [jwt]);

  const handleClick = () => {
    if (!isEmpty(accessiblePaths)) {
      navigate('/home');
    }
  };

  const headerList = [
    { id: 'account-management', name: 'Account Management' },
    { id: 'product-management', name: 'Product Management' },
    { id: 'order-management', name: 'Order Management' },
    { id: 'create-product', name: 'Create Product' },
    { id: 'shopping-cart', name: 'Shopping Cart' },
    { id: 'my-order', name: 'My Order' },
  ];

  const isCurrentPage = (param: string) => {
    return location.pathname === `/${param}`;
  };

  const isLoginOrRegister = () => {
    return ['/login', '/register'].includes(location.pathname);
  };

  const renderHeader = (item: { id: string; name: string }) => (
    <NavLink
      to={item.id}
      key={item.id}
      className={
        isCurrentPage(`${item.id}`)
          ? 'mx-3 border-b-2 border-white p-2 text-center text-pink-500 underline underline-offset-8'
          : 'mx-3 border-b-2 border-white p-2 text-center'
      }
    >
      {item.name}
      {item.name === 'Shopping Cart' && (
        <span
          data-testid="redDot"
          className={
            shoppingCartLength > 0
              ? 'mb-2 ml-1 inline-block h-2 w-2 rounded-full bg-red-600'
              : 'mb-2 ml-1 inline-block hidden h-2 w-2 rounded-full bg-red-600'
          }
        ></span>
      )}
    </NavLink>
  );

  return (
    <div className="flex h-[72px] items-center justify-between shadow-md">
      <div className="ml-8 flex min-w-[150px] items-center">
        <img
          src="/logo.png"
          alt=""
          className="logo h-14 w-16 cursor-pointer"
          onClick={handleClick}
        />
        <span className="cursor-pointer" onClick={handleClick}>
          OurShop
        </span>
      </div>
      <div className="flex items-center ">
        <div className="nav-list flex flex-1 justify-around">
          {isEmpty(accessiblePaths) ? (
            <div className="mr-80 font-semibold">Language : English</div>
          ) : (
            headerList
              // @ts-ignore
              .filter((list) => accessiblePaths.includes(list.id))
              .concat({ id: 'shopping-cart', name: 'Shopping Cart' })
              .concat({ id: 'my-order', name: 'My Order' })
              .map((item) => renderHeader(item))
          )}
        </div>
        {!isLoginOrRegister() && !isEmpty(accessiblePaths) && (
          <Profile></Profile>
        )}
      </div>
    </div>
  );
}
