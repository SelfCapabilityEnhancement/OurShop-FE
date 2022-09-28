import React from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';

const orders = [
  {
    id: 1,
    productName: 'Product Name',
    purchaseDate: '11.10.2022',
    purchaseNumber: '1',
  },
  {
    id: 2,
    productName: 'Product Name2',
    purchaseDate: '11.12.2022',
    purchaseNumber: '2',
  },
];
export default function MyOrder() {
  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        {orders.map((item) => (
          <li key={item.id} className="order-item product border-gray-400 mb-5 h-20 ">
            <OrderItem order={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
