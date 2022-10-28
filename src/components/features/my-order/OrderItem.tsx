import { OrdersItem } from '@/components/common/CustomeTypes';

export default function OrderItem(props: { order: OrdersItem }) {
  const order = props.order;
  const date = new Date(order.orders.purchaseDate);
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
      <div className="purchase-date absolute ml-[500px]">
        <span data-testid="purchase-date-title">Date of Purchase: </span>
        <span data-testid="purchase-date">{date.toLocaleDateString()}</span>
      </div>
      <div className="absolute ml-[1000px]">
        <span data-testid="number-title">Number: </span>
        <span data-testid="purchase-number">
          {order.orderProducts.purchaseNum}
        </span>
      </div>
    </div>
  );
}
