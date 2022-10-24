import { useLocation, useNavigate } from 'react-router-dom';
import { Product, User } from '@/components/common/CustomeTypes';
import { useEffect, useState } from 'react';
import { http } from '@/service';
import { getCurrentUser } from '@/utils';
import Loading from '@/components/common/loading/Loading';
import Banner from '@/components/common/banner/Banner';

export default function PurchaseConfirmation() {
  const navigate = useNavigate();
  const {
    state: { products, count, shoppingCartProductsIds },
  }: {
    state: {
      products: Array<Product>;
      count: Array<number>;
      shoppingCartProductsIds: Array<number>;
    };
  } = useLocation();
  const [showBanner, SetShowBanner] = useState(false);
  const [user, setUser] = useState<User>();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data[0]));
  }, []);

  const handleClickCancel = () => {
    navigate('/shopping-cart');
  };

  const handleClickBuy = async () => {
    setShowLoading(true);
    await http.post('/shopping-cart/pay-by-token', {
      userId: user?.id,
      token: calCostOfToken(),
      shoppingCartProductsIdList: shoppingCartProductsIds,
    });

    setShowLoading(false);
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
      <Banner
        visible={showBanner}
        success={true}
        message={'The Purchase Made Successfully!'}
      />
      <Loading visible={showLoading} message="Processing..." />
      <h1 className="wallet-header text-center text-3xl mb-10">
        Purchase Confirmation
      </h1>
      <ul className="flex-1 flex flex-col">
        {products.map(({ name, priceToken, images }, index) => (
          <li
            key={`product-${index}`}
            className="product border-gray-400 my-7 h-10"
          >
            <div className="flex flex-1 flex-row items-center items-center p-4">
              <div className="justify-center items-center mr-4">
                <img
                  alt="product"
                  src={images.split(',')[0]}
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
        <div className="ml-5 text-2xl text-purple-500">{user?.token}</div>
        <div className="text-right text-2xl">Cost of Tokens:</div>
        <div className="ml-5 text-2xl text-red-600">{calCostOfToken()}</div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button
          type="button"
          onClick={handleClickCancel}
          className="cancel w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-gray-400 hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleClickBuy}
          className="buy w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 "
        >
          Buy
        </button>
      </div>
    </div>
  );
}
