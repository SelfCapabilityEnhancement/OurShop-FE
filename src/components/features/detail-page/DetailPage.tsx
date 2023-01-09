import { useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import Banner from '@/components/common/banner/Banner';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import Loading from '@/components/common/loading/Loading';
import { OfficeStock, Product } from '@/components/common/CustomTypes';
import { useLocation } from 'react-router-dom';
import { addToCarts } from '@/service';
import { clsx as classNames } from 'clsx';
import useGlobalState from '@/state';

const successMsg = 'The Product was Added into Shopping Cart Successfully!';
const failMsg = 'The product is no longer available.';

export default function DetailPage() {
  const {
    state: { product },
  }: { state: { product: Product } } = useLocation();
  const [bigImgIndex, setBigImgIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [validation, setValidation] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [, setShoppingCartLength] = useGlobalState('shoppingCartLength');

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleAddToCart = async () => {
    setShowLoading(true);
    await addToCarts(product.id, count)
      .then(() => {
        setShoppingCartLength((prevState) => prevState + 1);
        setValidation(true);
        setShowLoading(false);

        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
        }, 1500);
      })
      .catch(() => {
        setValidation(false);
        setShowLoading(false);
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
        }, 1500);
      });
  };

  const renderProductOfficeStock = (item: OfficeStock) => {
    return (
      <div className="my-2 text-xl " key={item.officeId}>
        <span className="">
          {item.officeName}: {item.stock}
        </span>
      </div>
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
      <div className="DetailPage col-span-2 flex justify-center gap-4">
        <section className="mr-10">
          <Breadcrumb crumbNames={['Product Detail']} />
          <img
            src={product.images.split(',')[bigImgIndex]}
            alt={`big product picture ${bigImgIndex}`}
            className="mb-5 h-96 w-[420px] rounded-xl border-2 drop-shadow-xl"
          />
          <div className="small-pictures flex">
            {product.images.split(',').map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`small product picture ${index}`}
                className={classNames(
                  'mr-3 h-16 w-20 rounded-xl border-2 drop-shadow-lg',
                  index === bigImgIndex ? 'border-purple-600' : ''
                )}
                onClick={() => {
                  setBigImgIndex(index);
                }}
              />
            ))}
          </div>
        </section>
        <section className="w-[500px]">
          <div className="mb-4 self-center text-2xl font-medium">
            {product.name}
          </div>
          <p className="price h-12 rounded-xl bg-slate-100 p-2 text-xl">
            Price: ${product.priceMoney} or {product.priceToken} Token
          </p>
          <div className="my-4 self-center text-2xl font-medium">
            Product Description
          </div>
          <p className="description h-24 rounded-xl bg-slate-100 p-3 text-xl">
            {product.description}
          </p>
          <div
            data-testid="counter"
            className="PurchaseNumber bottom-12 my-4 flex items-center"
          >
            <span className="mr-36 text-2xl font-medium">No. of Purchase</span>
            <Counter
              count={count}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          </div>
          <div className="my-4 self-center text-2xl font-medium">
            Office & Inventory
          </div>
          <div className="mb-4 ml-2 grid grid-cols-3">
            {product.officeStockList.map((item) =>
              renderProductOfficeStock(item)
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddToCart}
              className="add-in-cart w-full w-56 rounded-lg bg-purple-600
              p-2 text-center text-base font-semibold text-white shadow-md
              transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2
              focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              Add in Shopping Cart
            </button>
            <button
              type="button"
              className="purchase w-full w-56 rounded-lg bg-purple-600
              p-2 text-center text-base font-semibold text-white shadow-md
              transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2
              focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              Purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
