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
import { classNames, validateOffice } from '@/utils';

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
  const [verifyMessage, setVerifyMessage] = useState<string>();
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
    (async () => {
      const res = await getAllOffices();
      setAllOffice(res.map(({ id, office }) => ({ id, office })));
    })();
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
    setShowLoading(true);
    const result = validateOffice(selectedOffice);

    if (result) {
      setVerifyOffice(result);
      SetShowBanner(true);
      setVerifyMessage('All required field must be filled!');
      setVerifySuccess(false);
      handleVerifyOffice();
    } else {
      localStorage.setItem('verifyOffice', String(result));
      const id = allOffice.filter((item) => {
        if (item.office === selectedOffice) {
          return item.id;
        }
        return 0;
      });
      setCollectOfficeId(id[0].id);
      try {
        await payByToken(cost, purchaseConfirmationItems, collectOfficeId);
        setShowLoading(false);
        SetShowBanner(true);
        setVerifyMessage('The purchase made successfully!');
        setVerifySuccess(true);
        handleVerify();
      } catch (e) {
        SetShowBanner(true);
        setVerifyMessage('Sorry, you do not have enough token!');
        setVerifySuccess(false);
        handleVerify();
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
    // localStorage.setItem('verifyOffice',String(false));
  };

  const dropDownItemClassName =
    'text-2xl relative w-full cursor-default bg-[#F7F5F9] py-2 pl-3 pr-[1.5rem] text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm';

  let dropDownClassName = classNames(
    dropDownItemClassName,
    selectedOffice === 'Select an Office' ? 'text-[#9DA3AE]' : ''
  );

  if (verifyOffice) {
    dropDownClassName += ' outline-none ring-2 ring-rose-500';
  }

  return (
    <div className="flex flex-col content-center shadow-lg min-w-[720px] rounded-2xl mx-auto mt-10 w-2/5 min-h-[720px] bg-zinc-300/40 p-4">
      <Banner
        visible={showBanner}
        success={isVerifySuccess}
        message={verifyMessage as string}
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
                <div className="text-xl font-normal text-right mr-[10%]">
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
      <div className="flex mr-[10%] mb-[3%] flex-row-reverse">
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
                <span className="text-xl block truncate">{selectedOffice}</span>
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
        <div className="text-right text-2xl mt-[1.5%] mr-[2%]">
          Collect My Product at{' '}
        </div>
      </div>

      <div className="mr-[10%]">
        <div className="text-right text-2xl mb-[3%]">
          Cost of Tokens:{' '}
          <span className="text-2xl text-red-600">{calCostOfToken()}</span>
        </div>
        <div className="text-right text-2xl mb-[3%]">
          My Tokens:{' '}
          <span className="text-2xl text-purple-500">{user?.token}</span>
        </div>
        <div className="text-right text-2xl mb-[3%]">
          My Number: <span>{user?.telephoneNum}</span>
        </div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button
          type="button"
          onClick={handleClickCancel}
          className="mt-[6%] cancel w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-gray-400 hover:bg-gray-600 "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleClickBuy}
          className="mt-[6%] buy w-1/4 p-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 disabled:opacity-50"
          disabled={!user?.id}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
