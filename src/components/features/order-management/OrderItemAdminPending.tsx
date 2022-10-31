import { OrdersItemAdmin } from '@/components/common/CustomeTypes';
import React from 'react';

export default function OrderItemAdminPending(props: {
  order: OrdersItemAdmin;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrdersItemAdmin: React.Dispatch<
    React.SetStateAction<OrdersItemAdmin>
  >;
  setShowOrderMadeButton: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const order = props.order;

  function openDetailWindow() {
    props.setShowOrderMadeButton(true);
    props.setShowWindow(true);
    props.setSelectedOrdersItemAdmin(order);
  }

  return (
    <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4 relative">
      <div className="w-20 h-16 flex-initial mx-5">
        <img
          alt="profile"
          src={order.product.images.split(',')[0]}
          className="w-20 h-16 mx-auto object-cover rounded-lg object-cover"
          data-testid="product-picture"
        />
      </div>
      <span className="font-medium flex-auto mx-5" data-testid="product-name">
        {order.product.name}
      </span>
      {/* FIXME: show in center */}
      <div className="absolute left-[600px]">
        <span data-testid="number-title">Number: </span>
        <span data-testid="total-order-number">{order.productNumAll}</span>
      </div>
      <button
        className="view-detail px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-800 text-white transition ease-in duration-200 font-semibold shadow-md rounded-lg"
        data-testid="view-detail"
        onClick={openDetailWindow}
      >
        View Detail
      </button>
    </div>
  );
}
