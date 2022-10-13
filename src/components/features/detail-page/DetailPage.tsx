import { useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import { getProducts } from '@/mocks/mockData';
import Banner from '@/components/common/banner/Banner';
import product1 from 'images/product/product1.png';
import product2 from 'images/product/product2.png';
import product3 from 'images/product/product3.png';
import product4 from 'images/product/product4.png';
import product5 from 'images/product/product5.png';

const products = getProducts();
const product = products[0];

export default function DetailPage() {
  const srcArray = [
    {
      id: 0,
      src: product1,
    },
    {
      id: 1,
      src: product2,
    },
    {
      id: 2,
      src: product3,
    },
    {
      id: 3,
      src: product4,
    },
    {
      id: 4,
      src: product5,
    },
  ];

  const [bigImg, setBigImg] = useState(srcArray[0]);
  const [showBanner, SetShowBanner] = useState(false);
  const [showSuccessBanner, SetShowSuccessBanner] = useState(false);
  const [firstLogisticMethodChecked, SetFirstLogisticMethodChecked] =
    useState(false);
  const [secondLogisticMethodChecked, SetSecondLogisticMethodChecked] =
    useState(false);
  const [count, setCount] = useState(1);

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  function handleAddToCart() {
    SetShowBanner(true);
    if (!firstLogisticMethodChecked && !secondLogisticMethodChecked) {
      SetShowSuccessBanner(false);
      setTimeout(() => {
        SetShowBanner(false);
      }, 1500);
    } else if (firstLogisticMethodChecked || secondLogisticMethodChecked) {
      SetShowSuccessBanner(true);
      setTimeout(() => {
        SetShowBanner(false);
      }, 1500);
    }
  }

  function handleFirstLogisticMethodClick() {
    if (!firstLogisticMethodChecked) {
      if (!secondLogisticMethodChecked) {
        SetFirstLogisticMethodChecked(true);
      } else if (secondLogisticMethodChecked) {
        SetFirstLogisticMethodChecked(true);
        SetSecondLogisticMethodChecked(false);
      }
    } else if (firstLogisticMethodChecked) {
      SetFirstLogisticMethodChecked(false);
    }
  }

  function handleSecondLogisticMethodClick() {
    if (!secondLogisticMethodChecked) {
      if (!firstLogisticMethodChecked) {
        SetSecondLogisticMethodChecked(true);
      } else if (firstLogisticMethodChecked) {
        SetSecondLogisticMethodChecked(true);
        SetFirstLogisticMethodChecked(false);
      }
    } else if (secondLogisticMethodChecked) {
      SetSecondLogisticMethodChecked(false);
    }
  }

  function handleRadioOnChange() {

  }
  return (
    <div className='mx-auto mt-10 relative'>
      <Banner visible={showBanner} success={showSuccessBanner}
              successMsg={'The product was added into shopping cart successfully!'}
              failMsg={'Please choose one logistic method!'} />

      <div className='DetailPage flex w-[1000px] gap-1 mt-[50px]'>
        <section>
          <img
            src={bigImg.src}
            alt={`big product picture ${bigImg.id}`}
            className='h-[375px] w-[500px] mb-5 rounded-xl'
          />
          <div className='flex small-pictures'>
            {srcArray.map((imgSrc) => (
              <img
                key={imgSrc.id}
                src={imgSrc.src}
                alt={`small product picture ${imgSrc.id}`}
                className={`h-[70px] w-[90px] mr-[12px] rounded-xl border-2 ${
                  imgSrc.id === bigImg.id ? 'border-purple-600' : ''
                }`}
                onClick={() => {
                  setBigImg(srcArray[imgSrc.id]);
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
            <Counter count={count} handlePlus={handlePlus} handleMinus={handleMinus} />
          </div>
          <h2 className='self-center mt-2 mb-2 ml-2 font-light sm:text-2xl'>
            Logistic method
          </h2>
          <div className='flex gap-[120px] mb-10 ml-2'>
            <div className='flex gap-[5px]' onClick={handleFirstLogisticMethodClick}>
              <input
                type='radio'
                className='firstLogisticMethod w-5 h-5 mt-1 accent-purple-500'
                checked={firstLogisticMethodChecked}
                onChange={handleRadioOnChange}
              />
              <span>collecting at office</span>
            </div>
            <div className='flex gap-[5px]' onClick={handleSecondLogisticMethodClick}>
              <input
                type='radio'
                checked={secondLogisticMethodChecked}
                onChange={handleRadioOnChange}
                className='secondLogisticMethod w-5 h-5 mt-1 accent-purple-500'
              />
              <span>shipping to an address</span>
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
