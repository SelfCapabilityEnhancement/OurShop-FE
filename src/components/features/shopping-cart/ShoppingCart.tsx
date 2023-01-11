import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from '@/components/common/counter/Counter';
import { getShoppingCarts, updateProductNum } from '@/service';
import { ShoppingCartItem } from '@/components/common/CustomTypes';
import Loading from '@/components/common/loading/Loading';

const notAvailableAtAnyOffice = 'The products is not available at any office';

export default function ShoppingCart() {
  const navigate = useNavigate();

  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);

  const [checkedState, setCheckedState] = useState(
    new Array(shoppingCartItems.length).fill(false)
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    getShoppingCarts(false).then((items) => {
      setShoppingCartItems(items);
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
    const selectedShoppingCartIds = selectedItems.map((e) => e.shoppingCartId);
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

  function renderProductAvailableOrNot(shoppingCartItem: { offices: string }) {
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
      className="relative mx-auto mt-5 h-[calc(100vh-150px)] w-5/6 min-w-[1080px]"
    >
      <Loading visible={showLoading} message="Loading..." />
      <div className="flex flex-col">
        <ul className="flex min-h-[700px] flex-col">
          {shoppingCartItems.map((shoppingCartItem, index) => {
            return (
              <li
                key={`product-${index}`}
                className={
                  shoppingCartItem.product.isDeleted ||
                  shoppingCartItem.offices === ''
                    ? 'product my-3 h-20 border-gray-400 opacity-25'
                    : 'product my-3 h-20 border-gray-400'
                }
              >
                <div className="flex min-w-[1400px] transform cursor-pointer select-none items-center rounded-md bg-white p-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-1/10 mx-5">
                    <img
                      alt="profile"
                      src={shoppingCartItem.product.images.split(',')[0]}
                      className="mx-auto h-16 w-20 rounded-lg object-cover"
                    />
                  </div>
                  <label
                    htmlFor="product-checkbox-1"
                    className="mx-5 w-1/5 font-medium"
                  >
                    {shoppingCartItem.product.name}
                  </label>
                  <div className="mx-5 flex w-1/5 items-center text-2xl font-medium">
                    <span className="mr-5">Number</span>
                    <Counter
                      count={shoppingCartItem.productNum}
                      handlePlus={() => handlePlus(index)}
                      handleMinus={() => handleMinus(index)}
                    />
                  </div>
                  <div className="flex w-2/5">
                    {renderProductAvailableOrNot(shoppingCartItem)}
                  </div>
                  <div className="m-1/10">
                    <input
                      id={`product-checkbox-${index}`}
                      type="checkbox"
                      disabled={
                        shoppingCartItem.product.isDeleted ||
                        shoppingCartItem.offices === ''
                      }
                      value=""
                      className="h-6 w-6 bg-gray-100 accent-violet-600 focus:ring-violet-700"
                      checked={checkedState[index]}
                      onChange={() => handleOnCheck(index)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <footer className="float-right flex w-1/2 justify-items-end self-end">
        <button
          type="button"
          onClick={handleOnClickPayBtn}
          disabled={!checkedState.includes(true)}
          className="token my-20 h-14 w-2/5 rounded-lg bg-violet-500 p-2 text-lg font-semibold
            text-white text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 disabled:opacity-50"
        >
          Pay by Token
        </button>
        <button
          type="button"
          disabled={!checkedState.includes(true)}
          className="money my-20 ml-36 h-14 w-2/5 rounded-lg bg-violet-500 p-2 text-lg font-semibold
            text-white text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 disabled:opacity-50"
        >
          Pay by Bank
        </button>
      </footer>
    </div>
  );
}
