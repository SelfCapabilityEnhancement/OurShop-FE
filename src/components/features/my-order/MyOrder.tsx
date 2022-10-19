import { useEffect, useState } from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { OrdersItem } from '@/components/common/CustomeTypes';
import { getCurrentUser } from '@/utils';
import { http } from '@/service';

export default function MyOrder() {
  const [ordersItems, setOrdersItems] = useState<OrdersItem[]>([]);

  useEffect(() => {
    getCurrentUser().then((data) => {
      http
        .get(`/orders/${data[0].id}`)
        .then((response) => setOrdersItems(response.data))
        // eslint-disable-next-line no-console
        .catch(console.error);
    });
  }, []);

  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        {ordersItems.map((item, key) => (
          <li
            key={key}
            className="order-item product border-gray-400 mb-5 h-20 "
          >
            <OrderItem order={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
