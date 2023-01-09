import { useEffect, useState } from 'react';
import OrderItem from '@/components/features/my-order/OrderItem';
import { OrdersItem } from '@/components/common/CustomTypes';
import { getOrdersItemsByUserId } from '@/service';
import MyOrderDetailWindow from '@/components/features/my-order/MyOrderDetailWindow';
import Banner from '@/components/common/banner/Banner';
import { useNavigate } from 'react-router-dom';

export default function MyOrder() {
  const navigate = useNavigate();

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
  const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);

  const routerList = localStorage.getItem('router');
  if (routerList === null) {
    useEffect(() => {
      setShowNotLoginBanner(true);
      setTimeout(() => {
        setShowNotLoginBanner(false);
        navigate('/login');
      }, 2000);
    }, []);
    return (
      <Banner
        visible={showNotLoginBanner}
        success={false}
        message={'Not Login'}
      />
    );
  } else {
    useEffect(() => {
      getOrdersItemsByUserId().then((data) =>
        setOrdersItems(orderByPurchaseDate(data))
      );
    }, []);

    function orderByPurchaseDate(ordersItems: OrdersItem[]) {
      return ordersItems.sort((objA, objB) => {
        const date1 = new Date(objA.purchaseDate);
        const date2 = new Date(objB.purchaseDate);
        return date2.getTime() - date1.getTime();
      });
    }

    return (
      <div className="mx-auto mt-5 w-[1280px]">
        <ul className="flex flex-col">
          {ordersItems.map((item) => (
            <li
              key={item.productId}
              className="order-item product mb-5 h-20 border-gray-400 "
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
}
