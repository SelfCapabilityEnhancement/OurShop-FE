import React from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';

const Orders = [
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
          <OrderItem order={Orders[0]} />
        </li>
      </ul>
    </div>
  );
}
