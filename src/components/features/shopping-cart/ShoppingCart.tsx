import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Product } from '@/components/common/CustomeTypes';
import { tempProducts } from '@/assets/mockData';


export default function ShoppingCart({products = tempProducts}: { products: Array<Product> }) {
  const navigate = useNavigate();
  const [checkedState, setCheckedState] = useState(
      new Array(products.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleOnClickPayBtn = () => {
    const result = products.filter((_item, index) => checkedState[index]);
    navigate('/purchase-confirmation', {state: result});
  };

  return (
      <div data-testid="shopping-cart" className="w-5/6 h-[calc(100vh-150px)] mx-auto mt-5 relative">
        {products.length === 0 ?
            <div className="empty-msg text-center text-3xl font-semibold mt-10">
              nothing in the shopping cart
            </div> : (<div>
              <ul className="flex flex-col">
                {products.map(({name, count}, index) => {
                  return (
                      <li key={`product-${index}`} className="product border-gray-400 my-5 h-20">
                        <div
                            className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
                          <div className="w-20 h-16 flex-initial mx-5">
                            <img alt="profile"
                                 src="src/assets/images/product/product1.png"
                                 className="mx-auto object-cover rounded-lg"/>
                          </div>
                          <label htmlFor="product-checkbox-1"
                                 className="font-medium flex-auto mx-5">
                            {name}
                          </label>
                          <div className="font-medium flex-auto">
                            Number {count}
                          </div>
                          <input id={`product-checkbox-${index}`}
                                 type="checkbox"
                                 value=""
                                 className="w-6 h-6 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                                 checked={checkedState[index]}
                                 onChange={() => handleOnChange(index)}/>
                        </div>
                      </li>
                  );
                })}
              </ul>
              <button type="button"
                      onClick={handleOnClickPayBtn}
                      className="payBtn token go-home w-1/6 px-3 py-3 h-12 absolute bottom-10 right-72 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 ">
                Pay by Token
              </button>
              <button type="button"
                      className="payBtn money go-home w-1/6 px-3 py-3 h-12 absolute bottom-10 right-2 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 ">
                Pay by Money
              </button>
            </div>)}
      </div>
  );
}
