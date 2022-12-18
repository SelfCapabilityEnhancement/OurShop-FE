import { useEffect, useState } from 'react';
import Counter from '@/components/common/counter/Counter';
import Banner from '@/components/common/banner/Banner';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import Loading from '@/components/common/loading/Loading';
import { OfficeStock, Product } from '@/components/common/CustomTypes';
import { useLocation } from 'react-router-dom';
import { addToCarts, getProductStockById } from '@/service';
import { classNames } from '@/utils';
import useGlobalState from '@/state';

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
  const [count, setCount] = useState(1);
  const [, setShoppingCartLength] = useGlobalState('shoppingCartLength');
  const [productOfficeStock, setProductOfficeStock] = useState<OfficeStock[]>(
    []
  );

  useEffect(() => {
    getProductStockById(product.id).then((officeStock) => {
      setProductOfficeStock(officeStock);
    });
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
    setValidation(true);
    setShowLoading(true);
    await addToCarts(product.id, count);
    setShoppingCartLength((prevState) => prevState + 1);
    setShowLoading(false);

    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 1500);
  };

  const renderProductOfficeStock = (item: OfficeStock) => {
    return (
      <div className="text-xl my-2 " key={item.office}>
        <span className="">
          {item.office} : {item.stock}
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
      <div className="DetailPage flex col-span-2 justify-center gap-4">
        <section className="mr-10">
          <Breadcrumb crumbNames={['Product Detail']} />
          <img
            src={product.images.split(',')[bigImgIndex]}
            alt={`big product picture ${bigImgIndex}`}
            className="h-96 w-[420px] mb-5 rounded-xl border-2 drop-shadow-xl"
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
        <section className="w-[500px]">
          <div className="self-center mb-4 font-medium text-2xl">
            {product.name}
          </div>
          <p className="price bg-slate-100 rounded-xl h-12 p-2 text-xl">
            Price: ${product.priceMoney} or {product.priceToken} Token
          </p>
          <div className="self-center my-4 font-medium text-2xl">
            Product Description
          </div>
          <p className="description bg-slate-100 rounded-xl h-24 p-3 text-xl">
            {product.description}
          </p>
          <div
            data-testid="counter"
            className="PurchaseNumber flex bottom-12 my-4 items-center"
          >
            <span className="mr-36 font-medium text-2xl">No. of Purchase</span>
            <Counter
              count={count}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          </div>
          <div className="self-center my-4 font-medium text-2xl">
            Office & Inventory
          </div>
          <div className="mb-4 ml-2 grid grid-cols-3">
            {productOfficeStock.map((item) => renderProductOfficeStock(item))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddToCart}
              className="add-in-cart p-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500
              focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200
              text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2
              focus:ring-offset-2 rounded-lg w-56"
            >
              Add in Shopping Cart
            </button>
            <button
              type="button"
              className="purchase p-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500
              focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200
              text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2
              focus:ring-offset-2 rounded-lg w-56"
            >
              Purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
