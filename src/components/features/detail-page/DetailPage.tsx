import { useState } from 'react';
import Counter from '@/components/common/counter/Counter';

export default function DetailPage() {
  const srcArray = [
    {
      id: 0,
      src: 'src/assets/images/product/product1.png',
    },
    {
      id: 1,
      src: 'src/assets/images/product/product2.png',
    },
    {
      id: 2,
      src: 'src/assets/images/product/product3.png',
    },
    {
      id: 3,
      src: 'src/assets/images/product/product4.png',
    },
    {
      id: 4,
      src: 'src/assets/images/product/product5.png',
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

  function handleRadioOnChange(){

  }
  return (
    <div className="mx-auto mt-10 relative">
      <div
        className={`add-in-cart-banner ${
          showBanner ? (showSuccessBanner ? 'block' : 'hidden') : 'hidden'
        } flex z-10 w-[500px] p-4 absolute top-2 left-[250px] text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="font-medium">
            The product was added into shopping cart successfully!
          </span>
        </div>
      </div>
      <div
        className={`add-in-cart-banner ${
          showBanner ? (!showSuccessBanner ? 'block' : 'hidden') : 'hidden'
        } flex z-10 w-[400px] p-4 absolute top-2 left-[350px] text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="font-medium">
            Please choose one logistic method!
          </span>
        </div>
      </div>
      <div className="DetailPage flex w-[1000px] gap-1 mt-[50px]">
        <section>
          <img
            src={bigImg.src}
            alt={`big product picture ${bigImg.id}`}
            className="h-[375px] w-[500px] mb-5 rounded-xl"
          />
          <div className="flex small-pictures">
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
        <section className="flex-1 relative">
          <h2 className="self-center mb-2 font-light sm:text-4xl">
            here is a book name xxxx
          </h2>
          <p className="price bg-slate-100 rounded-xl h-[60px] py-3 px-3 text-2xl">
            price: 111 or 5 token
          </p>
          <h2 className="self-center mt-2 mb-2 font-light sm:text-4xl">
            description
          </h2>
          <p className="description bg-slate-100 rounded-xl h-[210px] py-3 px-3 text-2xl">
            xxx
          </p>
          <div data-testid="counter" className="PurchaseNumber flex bottom-12 ml-2">
            <span className="my-auto mr-48 mb-2 text-2xl">No. of purchase</span>
            <Counter count={count} handlePlus={handlePlus} handleMinus={handleMinus}/>
          </div>
          <h2 className="self-center mt-2 mb-2 ml-2 font-light sm:text-2xl">
            Logistic method
          </h2>
          <div className="flex gap-[120px] mb-10 ml-2">
            <div className="flex gap-[5px]">
              <input
                type="radio"
                className="firstLogisticMethod w-5 h-5 mt-1 accent-purple-500"
                checked={firstLogisticMethodChecked}
                onClick={handleFirstLogisticMethodClick}
                onChange={handleRadioOnChange}
              />
              <span>collecting at office</span>
            </div>
            <div className="flex gap-[5px]">
              <input
                type="radio"
                checked={secondLogisticMethodChecked}
                onClick={handleSecondLogisticMethodClick}
                onChange={handleRadioOnChange}
                className="secondLogisticMethod w-5 h-5 mt-1 accent-purple-500"
              />
              <span>shipping to an address</span>
            </div>
          </div>
          <div className="flex gap-[25px]  bottom-0">
            <button
              type="button"
              onClick={handleAddToCart}
              className="add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]"
            >
              add in shopping cart
            </button>
            <button
              type="button"
              className="purchase-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[230px]"
            >
              purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
