import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '@/components/common/CustomeTypes';

export default function PurchaseConfirmation() {
  const navigate = useNavigate();
  const { state }: { state: Array<Product> } = useLocation();

  const handleClickCancel = () => {
    navigate('/shopping-cart');
  };
  const handleClickBuy = () => {
    navigate('/shopping-cart');
  };

  return (
    <div className="flex flex-col shadow-lg rounded-2xl mx-auto mt-10 w-2/5 h-[720px] bg-zinc-300/40 p-4">
      <h1 className="wallet-header text-center text-3xl mb-10">Purchase Confirmation</h1>

      <ul className="flex-1 flex flex-col">
        {
          state.map(({name, token, count}, index) => (
            <li key={`product-${index}`} className="product border-gray-400 my-7 h-10">
              <div className="flex flex-1 flex-row items-center items-center p-4">
                <div className="justify-center items-center mr-4">
                  <img alt="product"
                       src="src/assets/images/product/product1.png"
                       className="mx-auto object-cover rounded-lg h-20 w-24" />
                </div>
                <div className="flex-1 text-gray-600 text-2xl font-medium">
                  {name}
                </div>
                <div className="pl-1 mr-16">
                  <div className="text-2xl font-normal">
                    Number: {count}
                  </div>
                  <div className="text-xl font-normal">
                    Token: {token}
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="grid w-1/2 ml-auto mb-10 grid-cols-2 gap-y-4">
        <div className="text-right text-2xl">My Tokens:</div>
        <div className="ml-5 text-2xl text-purple-500">999</div>
        <div className="text-right text-2xl">Cost of Tokens:</div>
        <div className="ml-5 text-2xl text-red-600">235</div>
      </div>
      <div className="mt-auto mb-5 flex justify-around">
        <button type='button'
                onClick={handleClickCancel}
                className='button cancel w-1/4 px-3 py-3 h-12 text-lg text-white font-semibold rounded-lg bg-gray-400 hover:bg-gray-600 '>
          Cancel
        </button>
        <button type='button'
                onClick={handleClickBuy}
                className='button buy w-1/4 px-3 py-3 h-12 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 '>
          Buy
        </button>
      </div>
    </div>
  );
}
