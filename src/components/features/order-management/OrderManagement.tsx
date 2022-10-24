import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrdersItem, OrdersItemAdmin } from '@/components/common/CustomeTypes';
import { ordersItems } from '@/mocks/mockData';
import OrderItemAdminFinished from '@/components/features/order-management/OrderItemAdminFinished';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import OrderItemAdminPending from '@/components/features/order-management/OrderItemAdminPending';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';

export default function OrderManagement() {
  const product1 = {
    id: 2,
    name: '苹果',
    priceToken: 99,
    priceMoney: 9,
    description: '水果 🍊',
    stock: 1,
    images: 'https://ourshop-tw.netlify.app/assets/product1.04d88779.png',
  };
  const orders1 = {
    id: 1,
    userId: 1,
    orderProductsId: 1,
    orderAddress: 'order address',
    orderStatus: 'finished',
    vendorDate: new Date('2002-10-10'),
    purchaseDate: new Date('2022-10-01'),
  };

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [nowStatus, setNowStatus] = useState('all');
  const [adminOrdersItemList, setAdminOrdersItemList] = useState(
    getAdminOrdersList(ordersItems)
  );
  const [showWindow, setShowWindow] = useState(false);
  const [selectedOrdersItemAdmin, setSelectedOrdersItemAdmin] =
    useState<OrdersItemAdmin>({
      product: product1,
      productNumAll: 2,
      ordersList: [orders1],
    });

  function getAdminOrdersList(ordersItemList: OrdersItem[]) {
    let ordersItemAdminList: OrdersItemAdmin[] = [];

    for (let i: number = 0; i < ordersItemList.length; i++) {
      const productIds: number[] = [];
      ordersItemAdminList.map((ordersItemAdmin) =>
        productIds.push(ordersItemAdmin.product.id)
      );
      if (productIds.includes(ordersItemList[i].product.id)) {
        ordersItemAdminList = ordersItemAdminList.map((ordersItemAdmin) =>
          ordersItemAdmin.product.id === ordersItemList[i].product.id
            ? {
                ...ordersItemAdmin,
                productNumAll:
                  ordersItemAdmin.productNumAll +
                  ordersItemList[i].orderProducts.purchaseNum,
                ordersList: [
                  ...ordersItemAdmin.ordersList,
                  ordersItemList[i].orders,
                ],
              }
            : ordersItemAdmin
        );
      } else {
        ordersItemAdminList.push({
          product: ordersItemList[i].product,
          productNumAll: ordersItemList[i].orderProducts.purchaseNum,
          ordersList: [ordersItemList[i].orders],
        });
      }
    }
    return ordersItemAdminList;
  }

  const filterOrdersByStatus = (
    ordersItemList: OrdersItem[],
    status: string
  ) => {
    if (status === 'all') {
      return ordersItemList;
    } else {
      return ordersItemList.filter(
        (ordersItem) => ordersItem.orders.orderStatus === status
      );
    }
  };

  const filterOrdersByDateRange = (ordersItemsList: OrdersItem[]) => {
    startDate?.setHours(0, 0, 0);
    endDate?.setHours(23, 59, 59);
    if (startDate && endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return (
          order.orders.purchaseDate >= startDate &&
          order.orders.purchaseDate <= endDate
        );
      });
    } else if (startDate && !endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return order.orders.purchaseDate >= startDate;
      });
    } else if (!startDate && endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return order.orders.purchaseDate <= endDate;
      });
    } else {
      return ordersItemsList;
    }
  };

  const dataRangeFilterHandler = () => {
    setAdminOrdersItemList(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, nowStatus))
      )
    );
  };

  const resetHandler = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setAdminOrdersItemList(
      getAdminOrdersList(filterOrdersByStatus(ordersItems, nowStatus))
    );
  };

  const showAll = () => {
    setNowStatus('all');
    setAdminOrdersItemList(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'all'))
      )
    );
  };

  const showPending = () => {
    setNowStatus('pending');
    setAdminOrdersItemList(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'pending'))
      )
    );
  };

  const showFinished = () => {
    setNowStatus('finished');
    setAdminOrdersItemList(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'finished'))
      )
    );
  };

  const OrderItemAdminGivenStatus = (
    item: OrdersItemAdmin,
    nowStatus: string
  ) => {
    switch (nowStatus) {
      case 'all':
        return <OrderItemAdmin order={item} />;
      case 'pending':
        return (
          <OrderItemAdminPending
            order={item}
            setShowWindow={setShowWindow}
            setSelectedOrdersItemAdmin={setSelectedOrdersItemAdmin}
          />
        );
      case 'finished':
        return (
          <OrderItemAdminFinished
            order={item}
            setShowWindow={setShowWindow}
            setSelectedOrdersItemAdmin={setSelectedOrdersItemAdmin}
          />
        );
      default:
        return <OrderItemAdmin order={item} />;
    }
  };

  return (
    <div className="mt-10 ml-10">
      <div className="order-status-header w-11/12 mb-6">
        <label
          className="order-status-label all-label basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          onClick={showAll}
        >
          Sales Overview
        </label>
        <label
          className="order-status-label pending-order basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          onClick={showPending}
        >
          Pending Order
        </label>
        <label
          className="order-status-label finished-order basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          onClick={showFinished}
        >
          Historical Order
        </label>
      </div>
      <div className="date-range-selection w-11/12 absolute  mt-2">
        <div className="start-end-date-picker flex absolute top-1">
          <span className="mr-[10px] py-2">From</span>
          <ReactDatePicker
            className="start-date bg-slate-100 rounded-lg w-[100px] py-2 text-center"
            selected={startDate}
            placeholderText="time"
            onChange={(date: Date) => setStartDate(date)}
          />
          <span className="mx-[10px] py-2">To</span>
          <ReactDatePicker
            className="end-date bg-slate-100 rounded-lg w-[100px] py-2 text-center"
            selected={endDate}
            placeholderText="time"
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <div className="apply-reset-button flex absolute right-0">
          <button
            type="button"
            className="apply-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[80px] mr-[20px]"
            onClick={dataRangeFilterHandler}
          >
            Apply
          </button>
          <button
            type="button"
            className="reset-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-300 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[50px]"
            onClick={resetHandler}
          >
            <svg
              className="h-8 w-8 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        </div>
      </div>
      <div className="order-list w-11/12 mx-auto absolute top-[250px]">
        <ul className="flex flex-col">
          {adminOrdersItemList.map((item: OrdersItemAdmin) => (
            <li
              key={item.product.id}
              className="order-item-admin product border-gray-400 mb-5 h-20 "
            >
              {OrderItemAdminGivenStatus(item, nowStatus)}
            </li>
          ))}
        </ul>
      </div>
      <OrderDetailWindow
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        selectedOrdersItemAdmin={selectedOrdersItemAdmin}
      />
    </div>
  );
}
