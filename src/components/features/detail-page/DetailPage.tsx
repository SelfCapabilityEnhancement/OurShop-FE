import React, { useState } from 'react';
import Counter from '@/components/features/counter/Counter';

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

  return (
    <div className="mx-auto mt-10">
      <div className="DetailPage flex w-[1000px] gap-1 mt-[50px]">
        <section>
          <img
            src={bigImg.src}
            alt={`big product picture ${bigImg.id}`}
            className="h-80 w-96 mb-2 rounded-xl"
          />
          <div className="flex small-pictures">
            {srcArray.map((imgSrc) => (
              <img
                key={imgSrc.id}
                src={imgSrc.src}
                alt={`small product picture ${imgSrc.id}`}
                className={`h-14 w-16 mr-4 rounded-xl border-2 ${
                  imgSrc.id === bigImg.id ? 'border-red-700' : ''
                }`}
                onClick={() => {
                  setBigImg(srcArray[imgSrc.id]);
                }}
              />
            ))}
          </div>
        </section>
        <section className="flex-1 relative">
          <h2 className="self-center mb-2 text-xl font-light sm:text-2xl">
            here is a book name xxxx
          </h2>
          <p className="price bg-slate-300 rounded-xl h-[30px] py-1 px-2">price: 111 or 5 token</p>
          <h2 className="self-center mb-2 text-xl font-light sm:text-2xl">
            description
          </h2>
          <p className="description bg-slate-300 rounded-xl h-[180px] py-1 px-2">xxx</p>
          <div className="PurchaseNumber absolute bottom-12 ml-2">
            <Counter />
          </div>
          <div className="flex gap-5 absolute bottom-0">
            <button
              type="button"
              className="add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[190px]"
            >
              add in shopping cart
            </button>
            <button
              type="button"
              className="purchase-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[190px]"
            >
              purchase
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
