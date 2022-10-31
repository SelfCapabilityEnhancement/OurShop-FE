import { useEffect, useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import Banner from '@/components/common/banner/Banner';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import Loading from '@/components/common/loading/Loading';
import { Product, User } from '@/components/common/CustomeTypes';
import { useLocation } from 'react-router-dom';
import { getCurrentUser, http } from '@/service';
import { classNames } from '@/utils';

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
  const [showLoading, setShowLoading] = useState(false);
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
      setShowLoading(true);
      await http
        .post('/shopping-cart/create', {
          userId: user?.id,
          productId: product.id,
          productNum: count,
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
      setShowLoading(false);
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
    <div className="mx-auto mt-10">
      <Banner
        visible={showBanner}
        success={validation}
        message={validation ? successMsg : failMsg}
      />
      <Loading visible={showLoading} message="Processing..."></Loading>
      <div className="DetailPage flex mt-12">
        <section className="mr-10">
          <Breadcrumb crumbNames={['Product Detail']} />
          <img
            src={product.images.split(',')[bigImgIndex]}
            alt={`big product picture ${bigImgIndex}`}
            className="h-96 w-[500px] mb-5 rounded-xl border-2 drop-shadow-xl"
          />
          <div className="flex small-pictures">
            {product.images.split(',').map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`small product picture ${index}`}
                className={classNames(
                  'h-16 w-20 mr-3 rounded-xl border-2 drop-shadow-lg',
                  index === bigImgIndex ? 'border-purple-600' : ''
                )}
                onClick={() => {
                  setBigImgIndex(index);
                }}
              />
            ))}
          </div>
        </section>
        <section className="flex-1">
          <div className="self-center mb-3 font-medium text-3xl">
            {product.name}
          </div>
          <p className="price bg-slate-100 rounded-xl h-14 p-3 text-2xl">
            Price: ${product.priceMoney} or {product.priceToken} Token
          </p>
          <div className="self-center my-3 font-medium text-3xl">
            Product Description
          </div>
          <p className="description bg-slate-100 rounded-xl h-32 p-3 text-2xl">
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
          <div className="self-center my-3 font-medium text-3xl">
            Logistic Method
            <span className="text-red-500">*</span>
          </div>
          <div className="mb-3 ml-2 grid grid-cols-2 gap-x-5">
            {product.logisticMethod.includes('office') &&
              renderLogisticMethod('office')}
            {product.logisticMethod.includes('address') &&
              renderLogisticMethod('address')}
          </div>
          <div className="self-center my-3 font-medium text-3xl">Comment</div>
          <p className="description bg-slate-100 rounded-xl h-20 mb-10 p-3 text-2xl">
            {product.logisticMethodComment}
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddToCart}
              className="add-in-cart p-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-56"
            >
              Add in Shopping Cart
            </button>
            <button
              type="button"
              className="purchase p-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-56"
            >
              Purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
