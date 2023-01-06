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
  const [noneOffice, setNoneOffice] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    getShoppingCarts(false).then((items) => {
      setShoppingCartItems(items);
      setShowLoading(false);
    });
  }, []);

    useEffect(() => {
      if (checkedState.includes(true)) {
        if (noneOffice) {
          setButtonDisabled(true);
        } else {
          setButtonDisabled(false);
        }
      } else {
        setButtonDisabled(true);
      }
    }, [noneOffice, checkedState]);

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

      const selectedItems = shoppingCartItems.filter(
        (_item, index) => updatedCheckedState[index]
      );
      const selectedOffices = selectedItems.map(
        (e) => new Set(e.offices?.split(','))
      );
      let collectOffices = selectedOffices[0];

      for (let i = 1; i < selectedOffices.length; i++) {
        const tempOffices = selectedOffices[i];
        collectOffices = new Set(
          [...collectOffices].filter((x) => tempOffices.has(x))
        );
      }
      if (collectOffices.size === 0) {
        setNoneOffice(true);
      } else {
        setNoneOffice(false);
      }
    };

    const handleOnClickPayBtn = () => {
      const selectedItems = shoppingCartItems.filter(
        (_item, index) => checkedState[index]
      );
      const selectedProducts = selectedItems.map((e) => e.product);

      const selectedOffices = selectedItems.map(
        (e) => new Set(e.offices?.split(','))
      );
      let selectOfficeList = selectedOffices[0];

      for (let i = 1; i < selectedOffices.length; i++) {
        const tempOffices = selectedOffices[i];
        selectOfficeList = new Set(
          [...selectOfficeList].filter((x) => tempOffices.has(x))
        );
      }

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
          selectedOffices: selectOfficeList,
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
            <span className="w-[100px]">Available at:</span>
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
        <section className="h-[1rem]">
          {checkedState.includes(true) && noneOffice && (
            <p className="text-[#C5352C]">
              Please purchase individually, products are not available at same
              offices !
            </p>
          )}
        </section>
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
                      className="h-6 w-6 bg-gray-100 accent-violet-600 focus:ring-violet-700"
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
            disabled={buttonDisabled}
            className="my-20 token w-2/5 p-2 h-14 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Token
          </button>
          <button
            type="button"
            disabled={buttonDisabled}
            className="my-20 money w-2/5 p-2 h-14 ml-36 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Bank
          </button>
        </footer>
      </div>
    );
}
