import { useEffect, useState } from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { OrdersItem } from '@/components/common/CustomeTypes';
import { getCurrentUser, getOrdersItemsByUserId } from '@/service';

export default function MyOrder() {
  const [ordersItems, setOrdersItems] = useState<OrdersItem[]>([]);

  useEffect(() => {
    getCurrentUser().then((user) => {
      getOrdersItemsByUserId(user.id).then((data) => setOrdersItems(data));
    });
  }, []);

  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        {ordersItems.map((item) => (
          <li
            key={item.orderProducts.id}
            className="order-item product border-gray-400 mb-5 h-20 "
          >
            <OrderItem order={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
