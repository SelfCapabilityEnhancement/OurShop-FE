import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import logoUrl from 'images/logo.png';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex justify-between items-center shadow-md h-[71px]">
      <div className="flex items-center basis-1/2 ml-8">
        <img
          src={logoUrl}
          alt=""
          className="logo cursor-pointer w-[64px] h-[55px]"
          onClick={handleClick}
        />
        <span className="cursor-pointer" onClick={handleClick}>
          OurShop
        </span>
      </div>
      <div className="flex items-center basis-1/2">
        <div className="nav-list flex justify-around basis-3/4">
          <NavLink
            to="create-product"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Create Product
          </NavLink>
          <NavLink
            to="shopping-cart"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Shopping Cart
            <span data-testid="redDot" className="inline-block w-3 h-3 mr-2 bg-red-600 rounded-full mb-1 ml-1"></span>
          </NavLink>
          <NavLink
            to="my-order"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
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
