import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex justify-between items-center shadow-md h-[72px]">
      <div className="flex items-center basis-1/3 ml-8">
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
      <div className="flex items-center basis-5/12">
        <div className="nav-list flex justify-around flex-1">
          <NavLink
            to="order-management"
            className="basis-1/3 mx-2 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Order Management
          </NavLink>
          <NavLink
            to="create-product"
            className="basis-1/3 mx-2 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Create Product
          </NavLink>
          <NavLink
            to="shopping-cart"
            className="basis-1/3 mx-2 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Shopping Cart
            <span
              data-testid="redDot"
              className="inline-block w-2 h-2 bg-red-600 rounded-full mb-2 ml-1"
            ></span>
          </NavLink>
          <NavLink
            to="my-order"
            className="basis-1/3 mx-2 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            My Order
          </NavLink>
        </div>
        <Profile></Profile>
      </div>
    </div>
  );
}
