import { OrdersItem } from '@/components/common/CustomTypes';
import React from 'react';

export default function OrderItem(props: {
  order: OrdersItem;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrdersItem: React.Dispatch<React.SetStateAction<OrdersItem>>;
}) {
  const order = props.order;
  const date = order.purchaseDate;

  function myOrderDetailWindow() {
    props.setShowWindow(true);
    props.setSelectedOrdersItem(order);
  }

  return (
    <div className="flex transform cursor-pointer select-none flex-row items-center rounded-md bg-white p-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-5 flex-initial">
        <img
          alt="profile"
          src={order.images.split(',')[0]}
          className="mx-auto h-16 w-20 rounded-lg object-cover object-cover"
          data-testid="product-picture"
        />
      </div>
      <span
        className="mx-5 w-2/5 flex-initial font-medium"
        data-testid="product-name"
      >
        {order.productName}
      </span>
      <div className="purchase-date w-1/3">
        <span data-testid="purchase-date-title">Date of Purchase: </span>
        <span data-testid="purchase-date">{date}</span>
      </div>
      <div className="w-1/5">
        <span data-testid="number-title">Number: </span>
        <span data-testid="purchase-number">{order.purchaseNum}</span>
      </div>
      <button
        className="my-order-view-detail ml-24 mb-2 whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-800"
        data-testid="view-detail"
        onClick={myOrderDetailWindow}
      >
        View Detail
      </button>
    </div>
  );
}
