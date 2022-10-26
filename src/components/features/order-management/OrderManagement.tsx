import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrdersItem, OrdersItemAdmin } from '@/components/common/CustomeTypes';
import { ordersItems } from '@/mocks/mockData';
import OrderItemAdminFinished from '@/components/features/order-management/OrderItemAdminFinished';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import OrderItemAdminPending from '@/components/features/order-management/OrderItemAdminPending';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';

export default function OrderManagement() {
  const product = {
    id: 1,
    name: '',
    priceToken: 1,
    priceMoney: 1,
    description: '',
    stock: 1,
    images: '',
    logisticMethod: '',
    logisticMethodComment: '',
  };
  const orders = {
    id: 1,
    userId: 1,
    orderProductsId: 1,
    orderAddress: '',
    orderStatus: '',
    vendorDate: new Date(''),
    purchaseDate: new Date(''),
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
      product,
      productNumAll: 0,
      ordersList: [orders],
    });

  const titles = [
    { id: 'salesOverview', name: 'Sales Overview' },
    { id: 'pendingOrder', name: 'Pending Order' },
    { id: 'historicalOrder', name: 'Historical Order' },
  ];

  const [selectedTitle, setSelectedTitle] = useState(0);

  function getAdminOrdersList(ordersItemList: OrdersItem[]) {
    let ordersItemAdminList: OrdersItemAdmin[] = [];

    for (let i: number = 0; i < ordersItemList.length; i++) {
      const productIds: number[] = [];
      ordersItemAdminList.forEach((ordersItemAdmin) => {
        productIds.push(ordersItemAdmin.product.id);
      });
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

  const showTitle = (titleId: string) => {
    if (titleId === 'salesOverview') {
      return showAll();
    } else if (titleId === 'pendingOrder') {
      return showPending();
    } else if (titleId === 'historicalOrder') {
      return showFinished();
    } else {
      return showAll();
    }
  };

  return (
    <div className="mt-10 mx-10">
      <Tab.Group
        manual
        selectedIndex={selectedTitle}
        onChange={setSelectedTitle}
      >
        <Tab.List className="order-status-header w-11/12 mb-6 border-b-2 border-white">
          {titles.map((title) => (
            <Tab
              key={title.id}
              onClick={() => showTitle(title.id)}
              className={({ selected }) =>
                classNames(
                  `order-status-label ${title.id} w-52 rounded-lg text-xl font-normal outline-0`,
                  selected
                    ? 'text-pink-500 underline underline-offset-8 border-b-2 border-white'
                    : 'text-gray-800'
                )
              }
            >
              {title.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className="date-range-selection w-11/12 mt-2 flex items-center">
        <div className="start-end-date-picker flex ml-5">
          <span className="mr-2 py-2">From</span>
          <ReactDatePicker
            className="start-date bg-slate-100 rounded-lg w-28 py-2 text-center"
            selected={startDate}
            placeholderText="time"
            onChange={(date: Date) => setStartDate(date)}
          />
          <span className="mx-2 py-2">To</span>
          <ReactDatePicker
            className="end-date bg-slate-100 rounded-lg w-28 py-2 text-center"
            selected={endDate}
            placeholderText="time"
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <div className="apply-reset-button flex flex-1 justify-end">
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
