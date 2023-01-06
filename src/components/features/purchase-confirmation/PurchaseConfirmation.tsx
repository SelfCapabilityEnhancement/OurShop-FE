import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Product,
  PurchaseConfirmationItem,
  User,
} from '@/components/common/CustomTypes';
import { getAllOffices, getCurrentUser, payByToken } from '@/service';
import Loading from '@/components/common/loading/Loading';
import Banner from '@/components/common/banner/Banner';
import Counter from '@/components/common/counter/Counter';
import { Listbox, Transition } from '@headlessui/react';
import { clsx as classNames } from 'clsx';

export default function PurchaseConfirmation() {
  const navigate = useNavigate();
  const {
    state: {
      products,
      count,
      shoppingCartIds,
      productIds,
      logisticMethods,
      selectedOffices,
    },
  }: {
    state: {
      products: Array<Product>;
      count: Array<number>;
      shoppingCartIds: Array<number>;
      productIds: Array<number>;
      logisticMethods: Array<string>;
      selectedOffices: Set<string>;
    };
  } = useLocation();

  const offices = Array.from(selectedOffices);
  const [selectedOffice, setSelectedOffice] =
    useState<string>('Select an Office');

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
  const [verifyMessage, setVerifyMessage] = useState<string>('');
  const [isVerifySuccess, setVerifySuccess] = useState(false);
  const [user, setUser] = useState<User>();
  const [allCount, setAllCount] = useState(count);
  const [cost, setCost] = useState(calCostOfToken());
  const [showLoading, setShowLoading] = useState(false);
  const [verifyOffice, setVerifyOffice] = useState<boolean>(false);
  const [allOffice, setAllOffice] = useState<{ id: number; office: string }[]>(
    []
  );
  const [collectOfficeId, setCollectOfficeId] = useState<number>(0);

  useEffect(() => {
    getCurrentUser().then((user) => setUser(user));
    getAllOffices().then((data) => {
      setAllOffice(data);
    });
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

  const handleVerifyOffice = () => {
    setTimeout(() => {
      SetShowBanner(false);
      setShowLoading(false);
    }, 1500);
  };

  const handleClickBuy = async () => {
    getPurchaseConfirmationItems();

    const result = selectedOffice === 'Select an Office';

    if (result) {
      setVerifyOffice(result);
      SetShowBanner(true);
      setVerifyMessage('All required field must be filled!');
      setVerifySuccess(false);
      handleVerifyOffice();
    } else {
      setShowLoading(true);
      try {
        await payByToken(cost, purchaseConfirmationItems, collectOfficeId);
        setShowLoading(false);
        SetShowBanner(true);
        setVerifyMessage('The purchase made successfully!');
        setVerifySuccess(true);
        handleVerify();
      } catch (e: any) {
        SetShowBanner(true);
        setVerifySuccess(false);
        if (e.response.data.title === 'token not enough') {
          setVerifyMessage('Sorry, you do not have enough token!');
          handleVerify();
        } else {
          if (e.response.data.title === 'product is out of stock') {
            setVerifyMessage(e.response.data.detail);
            handleVerifyOffice();
          } else {
            setVerifyMessage('Sorry, Internet was broken!');
            handleVerify();
          }
        }
      }
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

  const selectOffice = (event: string) => {
    setSelectedOffice(event);
    setVerifyOffice(false);
    const filterOffice = allOffice.filter((item) => {
      if (item.office === event) {
        return item.id;
      }
      return 0;
    });
    setCollectOfficeId(filterOffice[0].id);
  };

  const dropDownItemClassName =
    'text-2xl relative w-full cursor-default bg-[#F7F5F9] py-2 pl-3 pr-[1.5rem] text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm';

  const dropDownClassName = classNames(dropDownItemClassName, {
    'text-[#606367]': selectedOffice === 'Select an Office',
    ' outline-none ring-2 ring-rose-500': verifyOffice,
  });

  return (
    <div className="mx-auto mt-10 flex min-h-[720px] w-2/5 min-w-[720px] flex-col content-center rounded-2xl bg-zinc-300/40 p-4 shadow-lg">
      <Banner
        visible={showBanner}
        success={isVerifySuccess}
        message={verifyMessage}
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
                <div className="mr-[10%] text-right text-xl font-normal">
                  Token:{' '}
                  <span className="text-purple-500">
                    {callCostOfOneProduct(index, priceToken)}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mr-[10%] mb-[3%] flex flex-row-reverse">
        <div>
          <Listbox
            value={offices}
            onChange={(event) => selectOffice(event as any as string)}
          >
            <div className="relative mt-1 w-[250px]">
              <Listbox.Button
                className={dropDownClassName}
                data-testid="drop-down"
              >
                <span className="block truncate text-xl">{selectedOffice}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="png"
                      fill={'rgb(217 217 217)'}
                      d="M18 15l-6-6l-6 6h12"
                      transform="rotate(180 12 12)"
                    />
                  </svg>
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-[#F3F4F6] py-1 text-center ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {offices.map((office, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                          active ? 'text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={office}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {office}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="mt-[1.5%] mr-[2%] text-right text-2xl">
          Collect My Product at{' '}
        </div>
      </div>

      <div className="mr-[10%]">
        <div className="mb-[3%] text-right text-2xl">
          Cost of Tokens:{' '}
          <span className="text-2xl text-red-600">{calCostOfToken()}</span>
        </div>
        <div className="mb-[3%] text-right text-2xl">
          My Tokens:{' '}
          <span className="text-2xl text-purple-500">{user?.token}</span>
        </div>
        <div className="mb-[3%] text-right text-2xl">
          My Number: <span>{user?.telephoneNum}</span>
        </div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button
          type="button"
          onClick={handleClickCancel}
          className="cancel mt-[6%] h-12 w-1/4 rounded-lg bg-gray-400 p-3 text-lg font-semibold text-white hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          data-testid="buyBtn"
          type="button"
          onClick={handleClickBuy}
          className="buy mt-[6%] h-12 w-1/4 rounded-lg bg-violet-500 p-3 text-lg font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          disabled={!user?.id}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
