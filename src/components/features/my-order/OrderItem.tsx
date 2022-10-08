import React from 'react';
import product1 from "images/product/product1.png";

export default function OrderItem(props: { order: any }) {
  const order = props.order;
  return (
    <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4 relative">
      <div className="w-20 h-16 flex-initial mx-5">
        <img
          alt="profile"
          src={product1}
          className="mx-auto object-cover rounded-lg"
          data-testid="product-picture"
        />
      </div>
      <span className="font-medium flex-auto mx-5" data-testid="product-name">
        {order.productName}
      </span>
      <div className="purchase-date absolute ml-[500px]">
        <span data-testid="purchase-date-title">Date of purchase: </span>
        <span data-testid="purchase-date">{order.purchaseDate}</span>
      </div>
      <div className="absolute ml-[1000px]">
        <span data-testid="number-title">number: </span>
        <span data-testid="purchase-number">{order.purchaseNumber}</span>
      </div>
    </div>
  );
}
