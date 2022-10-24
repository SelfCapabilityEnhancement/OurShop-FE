import { OrdersItemAdmin } from '@/components/common/CustomeTypes';

export default function OrderItemAdminFinished(props: {
  order: OrdersItemAdmin;
  setShowWindow: any;
  setSelectedOrdersItemAdmin: any;
}) {
  const order = props.order;

  function openDetailWindow() {
    props.setShowWindow(true);
    props.setSelectedOrdersItemAdmin(order);
  }

  return (
    <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4 relative">
      <div className="w-20 h-16 flex-initial mx-5">
        <img
          alt="profile"
          src={order.product.images.split(',')[0]}
          className="mx-auto object-cover rounded-lg"
          data-testid="product-picture"
        />
      </div>
      <span className="font-medium flex-auto mx-5" data-testid="product-name">
        {order.product.name}
      </span>
      {/* FIXME: show in center */}
      <div className="absolute left-[300px]">
        <span data-testid="ordered-date-title">Ordered Date: </span>
        <span data-testid="ordered-date">
          {order.ordersList[0].vendorDate
            ? order.ordersList[0].vendorDate.toLocaleDateString()
            : ''}
        </span>
      </div>
      <div className="absolute left-[600px]">
        <span data-testid="number-title">Number: </span>
        <span data-testid="total-order-number">{order.productNumAll}</span>
      </div>
      <button
        className="button text-white bg-violet-500 hover:bg-violet-700 font-medium rounded-lg text-lg w-35 px-5 py-2.5 text-center"
        data-testid="view-detail"
        onClick={openDetailWindow}
      >
        View Detail
      </button>
    </div>
  );
}
