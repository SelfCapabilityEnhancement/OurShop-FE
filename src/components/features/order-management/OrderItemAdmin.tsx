import { OrdersItemAdmin } from '@/components/common/CustomeTypes';

export default function OrderItemAdmin(props: { order: OrdersItemAdmin }) {
  const order = props.order;
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
      <div className="absolute right-10">
        <span data-testid="number-title">number: </span>
        <span data-testid="total-order-number">{order.productNumAll}</span>
      </div>
    </div>
  );
}
