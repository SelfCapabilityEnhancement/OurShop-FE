import { OrdersItemAdmin } from '@/components/common/CustomeTypes';
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
  const date = new Date(
    order.ordersList[0].vendorDate ? order.ordersList[0].vendorDate : ''
  );

  function openDetailWindow() {
    props.setShowOrderMadeButton(props.nowStatus === 'pending');
    props.setShowWindow(true);
    props.setSelectedOrdersItemAdmin(order);
  }

  return (
    <div className="flex transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4 relative">
      <div className="product-info flex flex-1 items-center">
        <img
          alt="profile"
          src={order.product.images.split(',')[0]}
          className="w-20 h-16 mr-10 object-cover rounded-lg object-cover"
          data-testid="product-picture"
        />
        <span className="font-medium mx-5" data-testid="product-name">
          {order.product.name}
        </span>
      </div>
      <div className="flex items-center">
        {props.nowStatus === 'finished' && (
          <div className="whitespace-nowrap w-[300px] ">
            <span data-testid="ordered-date-title">Order is Made on: </span>
            <span data-testid="ordered-date">{date.toLocaleDateString()}</span>
          </div>
        )}
        <div
          className={`whitespace-nowrap mr-5 ${
            props.nowStatus === 'pending' ? 'w-[400px]' : 'w-[100px]'
          } `}
        >
          <span data-testid="number-title">Number: </span>
          <span data-testid="total-order-number">{order.productNumAll}</span>
        </div>
        {props.nowStatus !== 'all' && (
          <button
            className="view-detail whitespace-nowrap ml-24 px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-800 text-white transition ease-in duration-200 font-semibold shadow-md rounded-lg"
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
