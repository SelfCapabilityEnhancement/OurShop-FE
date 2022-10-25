import { useEffect, useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import Banner from '@/components/common/banner/Banner';
import { Product, User } from '@/components/common/CustomeTypes';
import { useLocation } from 'react-router-dom';
import { http } from '@/service';
import { classNames, getCurrentUser } from '@/utils';

const logisticMethods = ['office', 'address'];

const successMsg = 'The Product was Added into Shopping Cart Successfully!';
const failMsg = 'Please Choose One Logistic Method!';
export default function DetailPage() {
  const {
    state: { product },
  }: { state: { product: Product } } = useLocation();
  const [bigImgIndex, setBigImgIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [validation, setValidation] = useState(false);
  const [logisticMethod, setLogisticMethod] = useState('');
  const [count, setCount] = useState(1);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data[0]));
  }, []);

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleAddToCart = async () => {
    if (validate()) {
      setValidation(true);
      await http
        .post('/shopping-cart/create', {
          userId: user?.id,
          productId: product.id,
          productNum: count,
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      setValidation(false);
    }

    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 1500);
  };

  const validate = () => {
    return logisticMethods.includes(logisticMethod);
  };

  const handleLogisticMethodClick = (value: string) => {
    setLogisticMethod(value);
  };

  const renderLogisticMethod = (method: string) => {
    return (
      <label
        htmlFor={method}
        className={classNames(
          'flex flex-row items-center text-xl',
          product.logisticMethod.includes(method) ? '' : 'display: none'
        )}
        onClick={() => handleLogisticMethodClick(method)}
      >
        <input
          id={method}
          type="radio"
          name="logistic"
          className="firstLogisticMethod w-5 h-5 mr-1 accent-purple-500"
        />
        {method === 'office'
          ? 'Collecting at Office'
          : 'Shipping to an Address'}
      </label>
    );
  };

  return (
    <div className="mx-auto mt-10 relative">
      <Banner
        visible={showBanner}
        success={validation}
        message={validation ? successMsg : failMsg}
      />

      <div className="DetailPage flex w-[1000px] mt-[50px]">
        <section className="mr-10">
          <img
            src={product.images.split(',')[bigImgIndex]}
            alt={`big product picture ${bigImgIndex}`}
            className="h-96 w-[500px] mb-5 rounded-xl drop-shadow-xl"
          />
          <div className="flex small-pictures">
            {product.images.split(',').map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`small product picture ${index}`}
                className={`h-16 w-20 mr-3 rounded-xl border-2 drop-shadow-lg ${
                  index === bigImgIndex ? 'border-purple-600' : ''
                }`}
                onClick={() => {
                  setBigImgIndex(index);
                }}
              />
            ))}
          </div>
        </section>
        <section className="flex-1 relative">
          <h2 className="self-center mb-3 font-medium text-3xl">
            {product.name}
          </h2>
          <p className="price bg-slate-100 rounded-xl h-[60px] py-3 px-3 text-2xl">
            Price: ${product.priceMoney} or {product.priceToken} token
          </p>
          <h2 className="self-center my-3 font-medium text-3xl">
            Product Description
          </h2>
          <p className="description bg-slate-100 rounded-xl h-40 py-3 px-3 text-2xl">
            {product.description}
          </p>
          <div
            data-testid="counter"
            className="PurchaseNumber flex bottom-12 my-3 items-center"
          >
            <span className="mr-36 font-medium text-3xl">No. of Purchase</span>
            <Counter
              count={count}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          </div>
          <h2 className="self-center my-3 font-medium text-3xl">
            Logistic Method
            <span className="text-red-500 pr-1">*</span>
          </h2>
          <div className="flex gap-[120px] mb-10 ml-2">
            <div className="grid grid-cols-2 gap-x-10">
              {renderLogisticMethod('office')}
              {renderLogisticMethod('address')}
            </div>
          </div>
          <div className="flex gap-[25px]  bottom-0">
            <button
              type="button"
              onClick={handleAddToCart}
              className="add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]"
            >
              Add in Shopping Cart
            </button>
            <button
              type="button"
              className="purchase-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]"
            >
              Purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
