import { useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import { useEffect, useState } from 'react';
import { ShoppingCartItem } from '@/components/common/CustomeTypes';
import { getCurrentUser, getShoppingCarts } from '@/service';
import { classNames } from '@/utils';
import { Tab } from '@headlessui/react';

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

  const headers = [
    { id: 'productManagement', name: 'Product Management' },
    { id: 'orderManagement', name: 'Order Management' },
    { id: 'createProduct', name: 'Create Product' },
    { id: 'shoppingCart', name: 'Shopping Cart' },
    { id: 'myOrder', name: 'My Order' },
  ];

  const [selectedHeader, setSelectedHeader] = useState(0);

  const showHeader = (headerId: string) => {
    if (headerId === 'orderManagement') {
      navigate('/order-management');
    } else if (headerId === 'createProduct') {
      navigate('/create-product');
    } else if (headerId === 'shoppingCart') {
      navigate('/shopping-cart');
    } else if (headerId === 'myOrder') {
      navigate('/my-order');
    } else if (headerId === 'productManagement') {
      navigate('/product-management');
    } else {
      navigate('/order-management');
    }
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
        <Tab.Group
          manual
          selectedIndex={selectedHeader}
          onChange={setSelectedHeader}
        >
          <Tab.List
            className="flex w-11/12 border-b-2 border-white"
            data-testid="header"
          >
            {headers.map((header) => (
              <Tab
                key={header.id}
                onClick={() => showHeader(header.id)}
                className={({ selected }) =>
                  classNames(
                    `order-status-label ${header.id} w-40 rounded-lg text-l text-center outline-0`,
                    selected
                      ? 'text-pink-500 underline underline-offset-8 border-b-2 border-white'
                      : 'text-gray-800'
                  )
                }
              >
                {header.name}
                {header.id === 'shoppingCart' && (
                  <span
                    data-testid="redDot"
                    className={classNames(
                      'inline-block w-2 h-2 bg-red-600 rounded-full mb-2 ml-1',
                      shoppingCartItems.length > 0 ? '' : 'hidden'
                    )}
                  ></span>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        <Profile></Profile>
      </div>
    </div>
  );
}
