import { useEffect, useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import Banner from '@/components/common/banner/Banner';
import product1 from 'images/product/product1.png';
import product2 from 'images/product/product2.png';
import product3 from 'images/product/product3.png';
import product4 from 'images/product/product4.png';
import product5 from 'images/product/product5.png';
import { Product, User } from '@/components/common/CustomeTypes';
import { useLocation } from 'react-router-dom';
import { http } from '@/service';
import { getCurrentUser } from '@/components/common/utils';

const srcArray = [product1, product2, product3, product4, product5];
const logisticMethods = ['office', 'address'];

const successMsg = 'The product was added into shopping cart successfully!';
const failMsg = 'Please choose one logistic method!';
export default function DetailPage() {
  const { state: { product } }: { state: { product: Product } } = useLocation();

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

  useEffect(() => {
    if (validation) {
      http.post('/shopping-cart/create',
        { userId: user?.id, productId: product.id, productNum: count })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [validation]);

  const handleAddToCart = async () => {
    validate();
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 1500);
  };

  const validate = () => {
    const result = logisticMethods.includes(logisticMethod);
    setValidation(result);
  };

  const handleLogisticMethodClick = (value: string) => {
    setLogisticMethod(value);
  };

  return (
    <div className='mx-auto mt-10 relative'>
      <Banner visible={showBanner}
              success={validation}
              message={validation ? successMsg : failMsg}
      />

      <div className='DetailPage flex w-[1000px] gap-1 mt-[50px]'>
        <section>
          <img
            src={srcArray[bigImgIndex]}
            alt={`big product picture ${bigImgIndex}`}
            className='h-[375px] w-[500px] mb-5 rounded-xl'
          />
          <div className='flex small-pictures'>
            {srcArray.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`small product picture ${index}`}
                className={`h-[70px] w-[90px] mr-[12px] rounded-xl border-2 ${
                  index === bigImgIndex ? 'border-purple-600' : ''
                }`}
                onClick={() => {
                  setBigImgIndex(index);
                }}
              />
            ))}
          </div>
        </section>
        <section className='flex-1 relative'>
          <h2 className='self-center mb-2 font-light sm:text-4xl'>
            {product.name}
          </h2>
          <p className='price bg-slate-100 rounded-xl h-[60px] py-3 px-3 text-2xl'>
            price: ${product.priceMoney} or {product.priceToken} token
          </p>
          <h2 className='self-center mt-2 mb-2 font-light sm:text-4xl'>
            Description
          </h2>
          <p className='description bg-slate-100 rounded-xl h-[210px] py-3 px-3 text-2xl'>
            {product.description}
          </p>
          <div data-testid='counter' className='PurchaseNumber flex bottom-12 ml-2'>
            <span className='my-auto mr-48 mb-2 text-2xl'>No. of purchase</span>
            <Counter count={count}
                     handlePlus={handlePlus}
                     handleMinus={handleMinus} />
          </div>
          <h2 className='self-center mt-2 mb-2 ml-2 font-light sm:text-2xl'>
            Logistic method
          </h2>
          <div className='flex gap-[120px] mb-10 ml-2'>
            <div className='grid grid-cols-2 gap-x-10'>
              <label htmlFor='office'
                     className='flex flex-row items-center'
                     onClick={() => handleLogisticMethodClick(logisticMethods[0])}>
                <input
                  id='office'
                  type='radio'
                  name='logistic'
                  className='firstLogisticMethod w-5 h-5 mr-1 accent-purple-500'
                />
                collecting at office</label>
              <label htmlFor='address'
                     className='flex flex-row items-center'
                     onClick={() => handleLogisticMethodClick(logisticMethods[1])}>
                <input
                  id='address'
                  type='radio'
                  name='logistic'
                  className='secondLogisticMethod w-5 h-5 mr-1 accent-purple-500'
                />
                shipping to an address</label>
            </div>
          </div>
          <div className='flex gap-[25px]  bottom-0'>
            <button
              type='button'
              onClick={handleAddToCart}
              className='add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]'
            >
              add in shopping cart
            </button>
            <button
              type='button'
              className='purchase-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]'
            >
              purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
