import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useEffect, useState } from 'react';
import { ShoppingCartItem } from '@/components/common/CustomTypes';
import { getShoppingCarts } from '@/service';
import { classNames } from '@/utils';
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
          'p-2 mx-3 text-center border-b-2 border-white',
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
            'inline-block w-2 h-2 bg-red-600 rounded-full mb-2 ml-1',
            shoppingCartLength > 0 ? '' : 'hidden'
          )}
        ></span>
      )}
    </NavLink>
  );

  return (
    <div className="flex justify-between items-center shadow-md h-[72px]">
      <div className="flex items-center ml-8 min-w-[150px]">
        <img
          src="/logo.png"
          alt=""
          className="logo cursor-pointer w-16 h-14"
          onClick={handleClick}
        />
        <span className="cursor-pointer" onClick={handleClick}>
          OurShop
        </span>
      </div>
      <div className="flex items-center ">
        <div className="nav-list flex justify-around flex-1">
          {routerList === null ? (
            <div className="font-semibold mr-80">Language : English</div>
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
