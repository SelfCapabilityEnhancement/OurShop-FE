import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '@/components/common/CustomeTypes';
import { useState } from 'react';
import productImage from 'images/product/product1.png';
import { http } from '@/service';
import { getCurrentUser } from '@/utils';

export default function PurchaseConfirmation() {
  const navigate = useNavigate();
  const {
    state: { products, count,shoppingCartProductsIds },
  }: { state: { products: Array<Product>; count: Array<number>,shoppingCartProductsIds:Array<number> } } =
    useLocation();
  const [showBanner, SetShowBanner] = useState(false);

  const handleClickCancel = () => {
    navigate('/shopping-cart');
  };

  const handleClickBuy = () => {
    getCurrentUser().then((data) => {
      const res = async () => {
        await http
          .post('/shopping-cart/pay-by-token', {
            userId: data[0].id,
            token: calCostOfToken(),
            shoppingCartProductsIdList: shoppingCartProductsIds,
          })
          .then((response) => response);
      };
      res();
    });

    SetShowBanner(true);
    setTimeout(() => {
      SetShowBanner(false);
      navigate('/shopping-cart');
    }, 1500);
  };

  const calCostOfToken = () => {
    let cost = 0;
    products.forEach((product, index) => {
      cost += count[index] * product.priceToken;
    });
    return cost;
  };

  return (
    <div className="flex flex-col content-center shadow-lg min-w-[720px] rounded-2xl mx-auto mt-10 w-2/5 h-[720px] bg-zinc-300/40 p-4">
      <div
        className={`purchase-confirmation-banner ${
          showBanner ? 'block' : 'hidden'
        } flex z-10 fixed p-4 top-40 left-[calc(50vw-175px)] w-[350px] text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-medium">The purchase made successfully!</span>
        </div>
      </div>
      <h1 className="wallet-header text-center text-3xl mb-10">
        Purchase Confirmation
      </h1>

      <ul className="flex-1 flex flex-col">
        {products.map(({ name, priceToken }, index) => (
          <li
            key={`product-${index}`}
            className="product border-gray-400 my-7 h-10"
          >
            <div className="flex flex-1 flex-row items-center items-center p-4">
              <div className="justify-center items-center mr-4">
                <img
                  alt="product"
                  src={productImage}
                  className="mx-auto object-cover rounded-lg h-20 w-24"
                />
              </div>
              <div className="flex-1 text-gray-600 text-2xl font-medium">
                {name}
              </div>
              <div className="pl-1 mr-16">
                <div className="text-2xl font-normal">
                  Number: {count[index]}
                </div>
                <div className="text-xl font-normal">Token: {priceToken}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid w-1/2 ml-auto mb-10 grid-cols-2 gap-y-4">
        <div className="text-right text-2xl">My Tokens:</div>
        <div className="ml-5 text-2xl text-purple-500">999</div>
        <div className="text-right text-2xl">Cost of Tokens:</div>
        <div className="ml-5 text-2xl text-red-600">{calCostOfToken()}</div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button
          type="button"
          onClick={handleClickCancel}
          className="button cancel w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-gray-400 hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleClickBuy}
          className="button buy w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 "
        >
          Buy
        </button>
      </div>
    </div>
  );
}
