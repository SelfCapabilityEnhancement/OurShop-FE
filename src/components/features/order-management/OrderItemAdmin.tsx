import { OrdersItemAdmin } from '@/components/common/CustomTypes';
import React from 'react';

export default function OrderItemAdmin(props: {
  order: OrdersItemAdmin;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrdersItemAdmin: React.Dispatch<
    React.SetStateAction<OrdersItemAdmin>
  >;
  setShowOrderMadeButton: React.Dispatch<React.SetStateAction<boolean>>;
  nowStatus: string;
}) {
  const order = props.order;
  // const date = new Date(order.ordersList[0].vendorDate);
  const date = order.ordersList[0].vendorDate;

  function openDetailWindow() {
    props.setShowOrderMadeButton(props.nowStatus === 'Pending');
    props.setShowWindow(true);
    props.setSelectedOrdersItemAdmin(order);
  }

  return (
    <div className="relative flex transform cursor-pointer select-none items-center rounded-md bg-white p-4 shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="product-info flex flex-1 items-center">
        <img
          alt="profile"
          src={order.images.split(',')[0]}
          className="mr-10 h-16 w-20 rounded-lg object-cover object-cover"
          data-testid="product-picture"
        />
        <span className="mx-5 font-medium" data-testid="product-name">
          {order.productName}
        </span>
      </div>
      <div className="flex items-center">
        {props.nowStatus === 'Finished' && (
          <div className="w-[300px] whitespace-nowrap ">
            <span data-testid="ordered-date-title">Order is Made on: </span>
            <span data-testid="ordered-date">{date}</span>
          </div>
        )}
        <div
          className={`mr-5 whitespace-nowrap ${
            props.nowStatus === 'Pending' ? 'w-[400px]' : 'w-[100px]'
          } `}
        >
          <span data-testid="number-title">Number: </span>
          <span data-testid="total-order-number">{order.productNumAll}</span>
        </div>
        {props.nowStatus !== 'All' && (
          <button
            className="view-detail ml-24 mb-2 whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-800"
            data-testid="view-detail"
            onClick={openDetailWindow}
          >
            View Detail
          </button>
        )}
      </div>
    </div>
  );
}
