import { useLocation, useNavigate } from 'react-router-dom';
import {
  Product,
  PurchaseConfirmationItem,
  User,
} from '@/components/common/CustomTypes';
import { useEffect, useState } from 'react';
import { getCurrentUser, payByToken } from '@/service';
import Loading from '@/components/common/loading/Loading';
import Banner from '@/components/common/banner/Banner';
import Counter from '@/components/common/counter/Counter';

export default function PurchaseConfirmation() {
  const navigate = useNavigate();
  const {
    state: { products, count, shoppingCartIds, productIds, logisticMethods },
  }: {
    state: {
      products: Array<Product>;
      count: Array<number>;
      shoppingCartIds: Array<number>;
      productIds: Array<number>;
      logisticMethods: Array<string>;
    };
  } = useLocation();

  const calCostOfToken = () => {
    let cost = 0;
    products.forEach((product, index) => {
      cost += allCount[index] * product.priceToken;
    });
    return cost;
  };

  const callCostOfOneProduct = (index: number, token: number) => {
    return allCount[index] * token;
  };

  const [showBanner, SetShowBanner] = useState(false);
  const [isVerifySuccess, setVerifySuccess] = useState(false);
  const [user, setUser] = useState<User>();
  const [allCount, setAllCount] = useState(count);
  const [cost, setCost] = useState(calCostOfToken());
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => setUser(user));
  }, []);

  useEffect(() => {
    setCost(calCostOfToken());
  }, [allCount]);

  const handleClickCancel = () => {
    navigate('/shopping-cart');
  };

  const purchaseConfirmationItems: PurchaseConfirmationItem[] = [];

  const getPurchaseConfirmationItems = () => {
    allCount.forEach((count, index) => {
      purchaseConfirmationItems.push({
        productNum: count,
        productId: productIds[index],
        shoppingCartId: shoppingCartIds[index],
        logisticMethod: logisticMethods[index],
      });
    });
  };

  const handleClickBuy = async () => {
    getPurchaseConfirmationItems();
    setShowLoading(true);
    try {
      await payByToken(user?.id as number, cost, purchaseConfirmationItems);
      setShowLoading(false);
      SetShowBanner(true);
      setVerifySuccess(true);
      setTimeout(() => {
        SetShowBanner(false);
        navigate('/shopping-cart');
      }, 1500);
    } catch (e) {
      SetShowBanner(true);
      setVerifySuccess(false);
    }
  };

  const handlePlus = async (index: number) => {
    const tmp = [...allCount];
    tmp[index] += 1;
    setAllCount(tmp);
  };

  const handleMinus = async (index: number) => {
    if (allCount[index] > 1) {
      const tmp = [...allCount];
      tmp[index] -= 1;
      setAllCount(tmp);
    }
  };

  return (
    <div className="flex flex-col content-center shadow-lg min-w-[720px] rounded-2xl mx-auto mt-10 w-2/5 min-h-[720px] bg-zinc-300/40 p-4">
      <Banner
        visible={showBanner}
        success={isVerifySuccess}
        message={
          isVerifySuccess
            ? 'The Purchase Made Successfully!'
            : 'Validation failure!'
        }
      />
      <Loading visible={showLoading} message="Processing..." />
      <h1 className="wallet-header text-center text-3xl mb-10">
        Purchase Confirmation
      </h1>
      <ul className="flex-1 flex flex-col mb-10">
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
              <div className="w-72">
                <div className="text-gray-600 text-2xl font-medium">{name}</div>
              </div>
              <div className="pl-1 mr-10">
                <div className="flex items-center">
                  <span className="text-2xl font-normal">Number:</span>
                  <Counter
                    count={allCount[index]}
                    handlePlus={() => handlePlus(index)}
                    handleMinus={() => handleMinus(index)}
                  />
                </div>
                <div className="text-xl font-normal">
                  Token: {callCostOfOneProduct(index, priceToken)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid w-1/2 ml-auto my-10 grid-cols-2 gap-y-4">
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
          className="buy w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 disabled:opacity-50"
          disabled={!user?.id}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
