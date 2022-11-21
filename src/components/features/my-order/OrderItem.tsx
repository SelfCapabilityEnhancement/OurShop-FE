import { OrdersItem } from '@/components/common/CustomeTypes';
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
    <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
      <div className="flex-initial mx-5">
        <img
          alt="profile"
          src={order.images.split(',')[0]}
          className="w-20 h-16 mx-auto object-cover rounded-lg object-cover"
          data-testid="product-picture"
        />
      </div>
      <span
        className="font-medium flex-initial w-2/5 mx-5"
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
        className="my-order-view-detail whitespace-nowrap ml-24 px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-800 text-white transition ease-in duration-200 font-semibold shadow-md rounded-lg"
        data-testid="view-detail"
        onClick={myOrderDetailWindow}
      >
        View Detail
      </button>
    </div>
  );
}
