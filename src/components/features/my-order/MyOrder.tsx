import React from 'react';

const mockOrder = [
  {
    productName: 'Product Name',
    purchaseDate: '11.10.2022',
    purchaseNumber: '1',
  },
];

export default function MyOrder() {
  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        <li className="product border-gray-400 mb-2 h-20 ">
          <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4 relative">
            <div className="w-20 h-16 flex-initial mx-5">
              <img
                alt="profile"
                src="src/assets/images/product/product1.png"
                className="mx-auto object-cover rounded-lg"
                data-testid="product-picture"
              />
            </div>
            <span
              className="font-medium flex-auto mx-5"
              data-testid="product-name"
            >
              {mockOrder[0].productName}
            </span>
            <div className="purchase-date absolute ml-[500px]">
              <span data-testid="purchase-date-title">Date of purchase: </span>
              <span data-testid="purchase-date">
                {mockOrder[0].purchaseDate}
              </span>
            </div>
            <div className="absolute ml-[1000px]">
              <span data-testid="number-title">number: </span>
              <span data-testid="purchase-number">{mockOrder[0].purchaseNumber}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
