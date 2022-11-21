import { useEffect, useState } from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { OrdersItem } from '@/components/common/CustomeTypes';
import { getCurrentUser, getOrdersItemsByUserId } from '@/service';
import MyOrderDetailWindow from '@/components/features/my-order/MyOrderDetailWindow';

export default function MyOrder() {
  const [ordersItems, setOrdersItems] = useState<OrdersItem[]>([]);
  const [showWindow, setShowWindow] = useState(false);
  const [selectedOrdersItem, setSelectedOrdersItem] = useState<OrdersItem>({
    productId: 0,
    purchaseNum: 0,
    orderId: 0,
    status: '',
    address: '',
    vendorDate: '',
    userId: 0,
    purchaseDate: '',
    productName: '',
    description: '',
    images: '',
    username: '',
    telephoneNum: '',
    logisticMethod: '',
  });

  useEffect(() => {
    getCurrentUser().then((user) => {
      getOrdersItemsByUserId(user.id).then((data) =>
        setOrdersItems(orderByPurchaseDate(data))
      );
    });
  }, []);

  function orderByPurchaseDate(ordersItems: OrdersItem[]) {
    return ordersItems.sort((objA, objB) => {
      const date1 = new Date(objA.purchaseDate);
      const date2 = new Date(objB.purchaseDate);
      return date2.getTime() - date1.getTime();
    });
  }

  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        {ordersItems.map((item) => (
          <li
            key={item.productId}
            className="order-item product border-gray-400 mb-5 h-20 "
          >
            <OrderItem
              order={item}
              setShowWindow={setShowWindow}
              setSelectedOrdersItem={setSelectedOrdersItem}
            />
          </li>
        ))}
      </ul>

      <MyOrderDetailWindow
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        selectedOrdersItem={selectedOrdersItem}
      />
    </div>
  );
}
