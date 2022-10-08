import React from 'react';
import product1 from 'images/product/product1.png';

export default function OrderItemAdmin(props: { order: any }) {
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
      <div className="absolute right-10">
        <span data-testid="number-title">number: </span>
        <span data-testid="total-order-number">{order.purchaseNumber}</span>
      </div>
    </div>
  );
}