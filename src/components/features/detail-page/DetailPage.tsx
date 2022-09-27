import React from 'react';
import Counter from '@/components/features/counter/Counter';

export default function DetailPage() {
  return (
    <div className="mx-auto mt-10">
      <div className="DetailPage flex w-[800px] gap-1">
        <section>
          <img
            src="src/assets/images/product/product1.png"
            alt="big product picture"
            className="h-80 w-96 mb-2"
          />
          <div className="flex small-pictures">
            <img
              src="src/assets/images/product/product1.png"
              alt="small product picture 1"
              className="h-14 w-16 mr-4"
            />
            <img
              src="src/assets/images/product/product1.png"
              alt="small product picture 2"
              className="h-14 w-16 mr-4"
            />
            <img
              src="src/assets/images/product/product1.png"
              alt="small product picture 3"
              className="h-14 w-16 mr-4"
            />
            <img
              src="src/assets/images/product/product1.png"
              alt="small product picture 4"
              className="h-14 w-16 mr-4"
            />
            <img
              src="src/assets/images/product/product1.png"
              alt="small product picture 5"
              className="h-14 w-16 mr-4"
            />
          </div>
        </section>
        <section className="flex-1 relative">
          <h2 className="self-center mb-2 text-xl font-light sm:text-2xl">
            here is a book name xxxx
          </h2>
          <p className="price bg-slate-300">price: 111 or 5 token</p>
          <h2 className="self-center mb-2 text-xl font-light sm:text-2xl">
            description
          </h2>
          <p className="description bg-slate-300">xxx</p>
          <div className="PurchaseNumber absolute bottom-16 ml-2">
            <Counter />
          </div>
          <div className="flex gap-5 absolute bottom-2">
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
