import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useEffect, useState } from 'react';
import { ShoppingCartItem } from '@/components/common/CustomeTypes';
import { getCurrentUser, getShoppingCarts } from '@/service';
import { classNames } from '@/utils';
import { useLocation } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);

  useEffect(() => {
    getCurrentUser().then(async ({ id }) => {
      const items = await getShoppingCarts(id);
      setShoppingCartItems(items);
    });
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  const location = useLocation();

  const isCurrentPage = (param: string) => {
    return location.pathname === `/${param}`;
  };

  return (
    <div className="flex justify-between items-center shadow-md h-[72px]">
      <div className="flex items-center ml-8">
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
      <div className="flex items-center">
        <div className="nav-list flex justify-around flex-1">
          <NavLink
            to="product-management"
            className={() =>
              classNames(
                'p-2 mx-3 text-center border-b-2 border-white',
                isCurrentPage('product-management')
                  ? 'text-pink-500 underline underline-offset-8'
                  : ''
              )
            }
          >
            Product Management
          </NavLink>
          <NavLink
            to="order-management"
            className={() =>
              classNames(
                'p-2 mx-3 text-center border-b-2 border-white',
                isCurrentPage('order-management')
                  ? 'text-pink-500 underline underline-offset-8'
                  : ''
              )
            }
          >
            Order Management
          </NavLink>
          <NavLink
            to="create-product"
            className={() =>
              classNames(
                'p-2 mx-3 text-center border-b-2 border-white',
                isCurrentPage('create-product')
                  ? 'text-pink-500 underline underline-offset-8'
                  : ''
              )
            }
          >
            Create Product
          </NavLink>
          <NavLink
            to="shopping-cart"
            className={() =>
              classNames(
                'p-2 mx-3 text-center border-b-2 border-white',
                isCurrentPage('shopping-cart')
                  ? 'text-pink-500 underline underline-offset-8'
                  : ''
              )
            }
          >
            Shopping Cart
            <span
              data-testid="redDot"
              className={classNames(
                'inline-block w-2 h-2 bg-red-600 rounded-full mb-2 ml-1',
                shoppingCartItems.length > 0 ? '' : 'hidden'
              )}
            ></span>
          </NavLink>
          <NavLink
            to="my-order"
            className={() =>
              classNames(
                'p-2 mx-3 text-center border-b-2 border-white',
                isCurrentPage('my-order')
                  ? 'text-pink-500 underline underline-offset-8'
                  : ''
              )
            }
          >
            My Order
          </NavLink>
        </div>
        <Profile></Profile>
      </div>
    </div>
  );
}
