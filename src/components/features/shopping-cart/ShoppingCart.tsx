import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from '@/components/common/counter/Counter';
import { getShoppingCarts, updateProductNum } from '@/service';
import { ShoppingCartItem } from '@/components/common/CustomTypes';
import Loading from '@/components/common/loading/Loading';
import useGlobalState from '@/state';
import Banner from '@/components/common/banner/Banner';

const notAvailableAtAnyOffice = 'The products is not available at any office';

export default function ShoppingCart() {
  const navigate = useNavigate();

  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);
  const [, setShoppingCartLength] = useGlobalState('shoppingCartLength');

  const [checkedState, setCheckedState] = useState(
    new Array(shoppingCartItems.length).fill(false)
  );
  const [showLoading, setShowLoading] = useState(false);
  const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);

  const routerList = localStorage.getItem('router');
  if (routerList === null) {
    useEffect(() => {
      setShowNotLoginBanner(true);
      setTimeout(() => {
        setShowNotLoginBanner(false);
        navigate('/login');
      }, 2000);
    }, []);
    return (
      <Banner
        visible={showNotLoginBanner}
        success={false}
        message={'Not Login'}
      />
    );
  } else {
    useEffect(() => {
      setShowLoading(true);
      getShoppingCarts().then((items) => {
        setShoppingCartItems(items);
        setShoppingCartLength(items.length);
        setShowLoading(false);
      });
    }, []);

    const handlePlus = async (index: number) => {
      if (!shoppingCartItems[index].product.isDeleted) {
        const tmp = [...shoppingCartItems];
        tmp[index].productNum += 1;
        const numSavedFlag = await updateProductNum(
          shoppingCartItems[index].productId,
          tmp[index].productNum
        );
        if (numSavedFlag) {
          setShoppingCartItems(tmp);
        }
      }
    };

    const handleMinus = async (index: number) => {
      if (!shoppingCartItems[index].product.isDeleted) {
        if (shoppingCartItems[index].productNum > 1) {
          const tmp = [...shoppingCartItems];
          tmp[index].productNum -= 1;
          const numSavedFlag = await updateProductNum(
            shoppingCartItems[index].productId,
            tmp[index].productNum
          );
          if (numSavedFlag) {
            setShoppingCartItems(tmp);
          }
        }
      }
    };

    const handleOnCheck = (position: number) => {
      const updatedCheckedState = [...checkedState];
      updatedCheckedState[position] = !updatedCheckedState[position];

      setCheckedState(updatedCheckedState);
    };

    const handleOnClickPayBtn = () => {
      const selectedItems = shoppingCartItems.filter(
        (_item, index) => checkedState[index]
      );
      const selectedProducts = selectedItems.map((e) => e.product);
      const selectedShoppingCartIds = selectedItems.map(
        (e) => e.shoppingCartId
      );
      const selectedProductIds = selectedItems.map((e) => e.productId);
      const count = selectedItems.map((e) => e.productNum);
      const logisticMethods = selectedItems.map((e) => e.logisticMethod);
      navigate('/purchase-confirmation', {
        state: {
          products: selectedProducts,
          count,
          shoppingCartIds: selectedShoppingCartIds,
          productIds: selectedProductIds,
          logisticMethods,
        },
      });
    };

    function renderProductAvailableOrNot(shoppingCartItem: {
      offices: string;
    }) {
      if (shoppingCartItem.offices === '') {
        return <span className="w-[500px]">{notAvailableAtAnyOffice}</span>;
      } else {
        return (
          <>
            <span className="w-[100px]">Available at :</span>
            <div className="mr-10">{shoppingCartItem.offices}</div>
          </>
        );
      }
    }

    return (
      <div
        data-testid="shopping-cart"
        className="w-5/6 min-w-[1080px] h-[calc(100vh-150px)] mx-auto mt-5 relative"
      >
        <Loading visible={showLoading} message="Loading..." />
        <div className="flex flex-col">
          <ul className="flex flex-col min-h-[700px]">
            {shoppingCartItems.map((shoppingCartItem, index) => {
              return (
                <li
                  key={`product-${index}`}
                  className={
                    shoppingCartItem.product.isDeleted ||
                    shoppingCartItem.offices === ''
                      ? 'product border-gray-400 my-3 h-20 opacity-25'
                      : 'product border-gray-400 my-3 h-20'
                  }
                >
                  <div className="flex transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
                    <div className="mx-5">
                      <img
                        alt="profile"
                        src={shoppingCartItem.product.images.split(',')[0]}
                        className="w-20 h-16 mx-auto object-cover rounded-lg"
                      />
                    </div>
                    <label
                      htmlFor="product-checkbox-1"
                      className="font-medium w-2/5 mx-5"
                    >
                      {shoppingCartItem.product.name}
                    </label>
                    <div className="font-medium flex w-2/5 items-center text-2xl mx-5">
                      <span className="mr-5">Number</span>
                      <Counter
                        count={shoppingCartItem.productNum}
                        handlePlus={() => handlePlus(index)}
                        handleMinus={() => handleMinus(index)}
                      />
                    </div>
                    <div className="flex w-[50%]">
                      {renderProductAvailableOrNot(shoppingCartItem)}
                    </div>
                    <input
                      id={`product-checkbox-${index}`}
                      type="checkbox"
                      disabled={
                        shoppingCartItem.product.isDeleted ||
                        shoppingCartItem.offices === ''
                      }
                      value=""
                      className="w-8 h-8 bg-gray-100 accent-violet-600 focus:ring-violet-700"
                      checked={checkedState[index]}
                      onChange={() => handleOnCheck(index)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <footer className="flex float-right w-1/2 justify-items-end self-end">
          <button
            type="button"
            onClick={handleOnClickPayBtn}
            disabled={!checkedState.includes(true)}
            className="my-20 token w-2/5 p-2 h-14 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Token
          </button>
          <button
            type="button"
            disabled={!checkedState.includes(true)}
            className="my-20 money w-2/5 p-2 h-14 ml-36 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Bank
          </button>
        </footer>
      </div>
    );
  }
}
