import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from '@/components/common/counter/Counter';
import { getCurrentUser, getShoppingCarts } from '@/service';
import { ShoppingCartItem } from '@/components/common/CustomeTypes';
import Loading from '@/components/common/loading/Loading';

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
    getCurrentUser().then(async ({ id }) => {
      const items = await getShoppingCarts(id);
      setShoppingCartItems(items);
      setShowLoading(false);
    });
  }, []);

  const handlePlus = (index: number) => {
    const tmp = [...shoppingCartItems];
    tmp[index].productNum += 1;
    setShoppingCartItems(tmp);
  };

  const handleMinus = (index: number) => {
    if (shoppingCartItems[index].productNum > 1) {
      const tmp = [...shoppingCartItems];
      tmp[index].productNum -= 1;
      setShoppingCartItems(tmp);
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
    const selectedShoppingCartProductsIds = selectedItems.map(
      (e) => e.shoppingCartProductsId
    );
    const count = selectedItems.map((e) => e.productNum);

    navigate('/purchase-confirmation', {
      state: {
        products: selectedProducts,
        count,
        shoppingCartProductsIds: selectedShoppingCartProductsIds,
      },
    });
  };

  return (
    <div
      data-testid="shopping-cart"
      className="w-5/6 min-w-[1080px] h-[calc(100vh-150px)] mx-auto mt-5 relative"
    >
      <Loading visible={showLoading} message="Loading..." />
      <div className="flex flex-col">
        <ul className="flex flex-col">
          {shoppingCartItems.map((shoppingCartItem, index) => {
            return (
              <li
                key={`product-${index}`}
                className="product border-gray-400 my-3 h-20"
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
                  <input
                    id={`product-checkbox-${index}`}
                    type="checkbox"
                    value=""
                    className="w-6 h-6 bg-gray-100 text-purple-600 accent-purple-600 focus:ring-purple-600 focus:ring-2"
                    checked={checkedState[index]}
                    onChange={() => handleOnCheck(index)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="my-10 w-1/2 grid grid-cols-2 justify-items-end self-end">
          <button
            type="button"
            onClick={handleOnClickPayBtn}
            disabled={!checkedState.includes(true)}
            className="payBtn token go-home w-3/5 p-2 h-12 right-72 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Token
          </button>
          <button
            type="button"
            disabled={!checkedState.includes(true)}
            className="payBtn money go-home w-3/5 p-2 h-12 right-2 text-lg text-white font-semibold rounded-lg
            bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
          >
            Pay by Money
          </button>
        </div>
      </div>
    </div>
  );
}
