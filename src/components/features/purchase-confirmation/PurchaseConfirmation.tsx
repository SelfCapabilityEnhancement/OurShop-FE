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
  const handleVerify = () => {
    setTimeout(() => {
      SetShowBanner(false);
      navigate('/shopping-cart');
    }, 1500);
  };

  const handleClickBuy = async () => {
    getPurchaseConfirmationItems();
    setShowLoading(true);
    try {
      await payByToken(cost, purchaseConfirmationItems);
      setShowLoading(false);
      SetShowBanner(true);
      setVerifySuccess(true);
      handleVerify();
    } catch (e) {
      SetShowBanner(true);
      setVerifySuccess(false);
      handleVerify();
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
    <div className="mx-auto mt-10 flex min-h-[720px] w-2/5 min-w-[720px] flex-col content-center rounded-2xl bg-zinc-300/40 p-4 shadow-lg">
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
      <h1 className="wallet-header mb-10 text-center text-3xl">
        Purchase Confirmation
      </h1>
      <ul className="mb-10 flex flex-1 flex-col">
        {products.map(({ name, priceToken, images }, index) => (
          <li
            key={`product-${index}`}
            className="product my-7 h-10 border-gray-400"
          >
            <div className="flex flex-1 flex-row items-center items-center p-4">
              <div className="mr-4 items-center justify-center">
                <img
                  alt="product"
                  src={images.split(',')[0]}
                  className="mx-auto h-20 w-24 rounded-lg object-cover"
                />
              </div>
              <div className="w-72">
                <div className="text-2xl font-medium text-gray-600">{name}</div>
              </div>
              <div className="mr-10 pl-1">
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

      <div className="mb-[10%] mr-[10%]">
        <div className="text-right text-2xl mb-[2%]">
          Cost of Tokens:{' '}
          <span className="text-2xl text-red-600">{calCostOfToken()}</span>
        </div>
        <div className="text-right text-2xl mb-[2%]">
          My Tokens:{' '}
          <span className="text-2xl text-purple-500">{user?.token}</span>
        </div>
        <div className="text-right text-2xl mb-[2%]">
          My Number: <span>{user?.telephoneNum}</span>
        </div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button
          type="button"
          onClick={handleClickCancel}
          className="cancel h-12 w-1/4 rounded-lg bg-gray-400 p-3 text-lg font-semibold text-white hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleClickBuy}
          className="buy h-12 w-1/4 rounded-lg bg-violet-500 p-3 text-lg font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          disabled={!user?.id}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
