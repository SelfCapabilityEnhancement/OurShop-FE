import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useEffect, useState } from 'react';
import { ShoppingCartItem } from '@/components/common/CustomTypes';
import { getShoppingCarts } from '@/service';
import { clsx as classNames } from 'clsx';
import { useLocation } from 'react-router';
import useGlobalState from '@/state';

export default function Header() {
  const navigate = useNavigate();
  const [, setShoppingCartItems] = useState<ShoppingCartItem[]>([]);

  const [shoppingCartLength, setShoppingCartLength] =
    useGlobalState('shoppingCartLength');

  const location = useLocation();

  useEffect(() => {
    if (isLoginOrRegister()) {
      localStorage.clear();
    }
    if (localStorage.getItem('jwt') != null) {
      getShoppingCarts().then((items) => {
        setShoppingCartItems(items);
        setShoppingCartLength(items.length);
      });
    }
  }, [localStorage.getItem('jwt')]);

  const handleClick = () => {
    navigate('/home');
  };

  const headerList = [
    { id: 'account-management', name: 'Account Management' },
    { id: 'product-management', name: 'Product Management' },
    { id: 'order-management', name: 'Order Management' },
    { id: 'create-product', name: 'Create Product' },
    { id: 'shopping-cart', name: 'Shopping Cart' },
    { id: 'my-order', name: 'My Order' },
  ];
  const routerList = localStorage.getItem('router');

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
      className={() =>
        classNames(
          'mx-3 border-b-2 border-white p-2 text-center',
          isCurrentPage(`${item.id}`)
            ? 'text-pink-500 underline underline-offset-8'
            : ''
        )
      }
    >
      {item.name}
      {item.name === 'Shopping Cart' && (
        <span
          data-testid="redDot"
          className={classNames(
            'mb-2 ml-1 inline-block h-2 w-2 rounded-full bg-red-600',
            shoppingCartLength > 0 ? '' : 'hidden'
          )}
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
          {routerList === null ? (
            <div className="mr-80 font-semibold">Language : English</div>
          ) : (
            headerList
              // @ts-ignore
              .filter((list) => routerList.includes(list.id))
              .concat({ id: 'shopping-cart', name: 'Shopping Cart' })
              .concat({ id: 'my-order', name: 'My Order' })
              .map((item) => renderHeader(item))
          )}
        </div>
        {!isLoginOrRegister() && <Profile></Profile>}
      </div>
    </div>
  );
}
