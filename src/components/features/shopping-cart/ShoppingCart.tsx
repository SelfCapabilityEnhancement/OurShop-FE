import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Counter from '@/components/common/counter/Counter';
import productImage from 'images/product/product1.png';
import {http} from '@/service';
import {ShoppingCartItem} from '@/components/common/CustomeTypes';
import {getCurrentUser} from '@/components/common/utils';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartItem[]>([]);
  const [checkedState, setCheckedState] = useState(
      new Array(shoppingCartItems.length).fill(false)
  );

  useEffect(() => {
    getCurrentUser().then((data) => {
      http.get(`/shopping-cart/user/${data[0].id}`).then((response) => setShoppingCartItems(response.data))
      // eslint-disable-next-line no-console
      .catch(console.error);
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
    const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleOnClickPayBtn = () => {
    const selectedItems = shoppingCartItems.filter((_item, index) => checkedState[index]);
    navigate('/purchase-confirmation', {state: {selectedItems}});
  };

  return (
      <div data-testid="shopping-cart"
           className="w-5/6 min-w-[720px] h-[calc(100vh-150px)] mx-auto mt-5 relative">
        {shoppingCartItems.length === 0 ?
            <div className="empty-msg text-center text-3xl font-semibold mt-10">
              nothing in the shopping cart
            </div> : (<div>
              <ul className="flex flex-col">
                {shoppingCartItems.map((shoppingCartItem, index) => {
                  return (
                      <li key={`product-${index}`}
                          className="product border-gray-400 my-3 h-20">
                        <div
                            className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
                          <div className="w-20 h-16 flex-initial mx-5">
                            <img alt="profile"
                                 src={productImage}
                                 className="mx-auto object-cover rounded-lg"/>
                          </div>
                          <label htmlFor="product-checkbox-1"
                                 className="font-medium flex-auto mx-5">
                            {shoppingCartItem.product.name}
                          </label>
                          <div
                              className="font-medium flex-auto flex flex-row items-center text-2xl">
                            <span className="mr-5">Number</span>
                            <Counter count={shoppingCartItem.productNum}
                                     handlePlus={() => handlePlus(index)}
                                     handleMinus={() => handleMinus(index)}/>
                          </div>
                          <input id={`product-checkbox-${index}`}
                                 type="checkbox"
                                 value=""
                                 className="w-6 h-6 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                                 checked={checkedState[index]}
                                 onChange={() => handleOnCheck(index)}/>
                        </div>
                      </li>
                  );
                })}
              </ul>
              <button type="button"
                      onClick={handleOnClickPayBtn}
                      className="payBtn token go-home w-1/6 min-w-fit p-3 h-12 absolute bottom-10 right-72 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 ">
                Pay by Token
              </button>
              <button type="button"
                      className="payBtn money go-home w-1/6 min-w-fit p-3 h-12 absolute bottom-10 right-2 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 ">
                Pay by Money
              </button>
            </div>)}
      </div>
  );
}
