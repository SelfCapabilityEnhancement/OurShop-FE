import { useState } from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { OrdersItem } from '@/components/common/CustomTypes';
import { getOrdersItemsByUserId } from '@/service';
import MyOrderDetailWindow from '@/components/features/my-order/MyOrderDetailWindow';
import { useQuery } from '@tanstack/react-query';
import { useLoginStore } from '@/hooks/useLoginStore';

export default function MyOrder() {
  const [selectedOrdersItem, setSelectedOrdersItem] = useState<
    OrdersItem | undefined
  >();
  const jwt = useLoginStore((state) => state.jwt);

  const queryCurrentUserOrders = useQuery({
    queryKey: ['orders', { userId: jwt }], // todo: replace jwt with userId
    queryFn: getOrdersItemsByUserId,
  });

  return (
    <div className="mx-auto mt-5 w-[1280px]">
      <ul className="flex flex-col">
        {queryCurrentUserOrders.data?.map((item) => (
          <li
            key={item.orderId}
            className="order-item product mb-5 h-20 border-gray-400 "
          >
            <OrderItem
              order={item}
              onViewDetail={() => setSelectedOrdersItem(item)}
            />
          </li>
        ))}
      </ul>

      <MyOrderDetailWindow
        selectedOrdersItem={selectedOrdersItem}
        onClose={() => setSelectedOrdersItem(undefined)}
      />
    </div>
  );
}
