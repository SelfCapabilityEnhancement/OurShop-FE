import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrdersItem, OrdersItemAdmin } from '@/components/common/CustomeTypes';
import OrderItemAdminFinished from '@/components/features/order-management/OrderItemAdminFinished';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import OrderItemAdminPending from '@/components/features/order-management/OrderItemAdminPending';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { http } from '@/service';
import ReactECharts from 'echarts-for-react';
// @ts-ignore
import cloneDeep from 'lodash.clonedeep';

import HLine from '@/components/common/horizontal-line/HorizontalLine';
import Banner from '@/components/common/banner/Banner';

const initGoodOption = {
  title: {
    text: 'Most Popular Product',
  },
  grid: { containLabel: true },
  tooltip: {},
  xAxis: {},
  yAxis: {
    inverse: true,
    max: 9,
    data: ['1', '2', '3'],
  },
  series: [
    {
      realtimeSort: true,
      name: '销量',
      type: 'bar',
      data: [1, 2, 3],
      label: {
        show: true,
        position: 'right',
      },
    },
  ],
};

const initCategoryOption = {
  title: {
    text: 'Sales by Product Category',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '7%',
    left: 'center',
  },
  series: [
    {
      name: 'Category',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: 'Clothes' },
        { value: 735, name: 'Souvenir' },
        { value: 580, name: 'Books' },
      ],
    },
  ],
};

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

const titles = [
  { id: 'salesOverview', name: 'Sales Overview' },
  { id: 'pendingOrder', name: 'Pending Order' },
  { id: 'historicalOrder', name: 'Historical Order' },
];

export default function OrderManagement() {
  const [goodOption, setGoodOption] = useState(initGoodOption);
  // eslint-disable-next-line no-unused-vars
  const [categoryOption, setCategoryOption] = useState(initCategoryOption);
  const [ordersItems, setOrdersItems] = useState<OrdersItem[]>([]);
  const [adminOrdersItems, setAdminOrdersItems] = useState<OrdersItemAdmin[]>(
    []
  );

  useEffect(() => {
    http.get(`/orders`).then((response) => {
      setOrdersItems(response.data);
      setAdminOrdersItems(getAdminOrdersList(response.data, 'all'));
    });
  }, []);

  useEffect(() => {
    const sortedItems = [...adminOrdersItems].sort((a, b) => {
      return a.productNumAll > b.productNumAll ? -1 : 1;
    });

    setGoodOption((prevState) => {
      const tmp = cloneDeep(prevState);
      tmp.yAxis.data = sortedItems.map((a) => a.product.name);
      tmp.series[0].data = sortedItems.map((a) => a.productNumAll);
      return tmp;
    });
  }, [adminOrdersItems]);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [nowStatus, setNowStatus] = useState('all');

  const [showWindow, setShowWindow] = useState(false);
  const [selectedOrdersItemAdmin, setSelectedOrdersItemAdmin] =
    useState<OrdersItemAdmin>({
      product,
      productNumAll: 0,
      ordersList: [orders],
    });
  const [showOrderMadeButton, setShowOrderMadeButton] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  function orderByVendorDate(ordersItemAdminList: OrdersItemAdmin[]) {
    return ordersItemAdminList.sort((objA, objB) => {
      const date1 = new Date(objA.ordersList[0].vendorDate);
      const date2 = new Date(objB.ordersList[0].vendorDate);
      return date2.getTime() - date1.getTime();
    });
  }

  const countProductNumAllByProductId = (
    ordersItemAdmin: OrdersItemAdmin,
    ordersItemList: OrdersItem[],
    index: number
  ) =>
    ordersItemAdmin.product.id === ordersItemList[index].product.id
      ? {
          ...ordersItemAdmin,
          productNumAll:
            ordersItemAdmin.productNumAll +
            ordersItemList[index].orderProducts.purchaseNum,
          ordersList: [
            ...ordersItemAdmin.ordersList,
            ordersItemList[index].orders,
          ],
        }
      : ordersItemAdmin;

  const countProductNumAllByProductIdAndVendorDate = (
    ordersItemAdmin: OrdersItemAdmin,
    ordersItemList: OrdersItem[],
    index: number,
    date: Date
  ) =>
    ordersItemAdmin.product.id === ordersItemList[index].product.id &&
    ordersItemAdmin.ordersList[0].vendorDate === date
      ? {
          ...ordersItemAdmin,
          productNumAll:
            ordersItemAdmin.productNumAll +
            ordersItemList[index].orderProducts.purchaseNum,
          ordersList: [
            ...ordersItemAdmin.ordersList,
            ordersItemList[index].orders,
          ],
        }
      : ordersItemAdmin;

  const addNewOrdersItemAdmin = (
    ordersItemAdminList: OrdersItemAdmin[],
    ordersItemList: OrdersItem[],
    index: number
  ) => {
    ordersItemAdminList.push({
      product: ordersItemList[index].product,
      productNumAll: ordersItemList[index].orderProducts.purchaseNum,
      ordersList: [ordersItemList[index].orders],
    });
  };

  function getAdminOrdersList(ordersItemList: OrdersItem[], status: string) {
    let ordersItemAdminList: OrdersItemAdmin[] = [];
    for (let i: number = 0; i < ordersItemList.length; i++) {
      const productIds: number[] = [];
      ordersItemAdminList.forEach((ordersItemAdmin) => {
        productIds.push(ordersItemAdmin.product.id);
      });
      const vendorDates: String[] = [];
      if (status === 'finished') {
        ordersItemAdminList.forEach((ordersItemAdmin) => {
          vendorDates.push(ordersItemAdmin.ordersList[0].vendorDate.toString());
        });
      }
      const dateOrder = ordersItemList[i].orders.vendorDate;
      if (status === 'finished') {
        if (
          productIds.includes(ordersItemList[i].product.id) &&
          vendorDates.includes(dateOrder.toString())
        ) {
          ordersItemAdminList = ordersItemAdminList.map((ordersItemAdmin) =>
            countProductNumAllByProductIdAndVendorDate(
              ordersItemAdmin,
              ordersItemList,
              i,
              dateOrder
            )
          );
        } else {
          addNewOrdersItemAdmin(ordersItemAdminList, ordersItemList, i);
        }
      }
      if (status !== 'finished') {
        if (productIds.includes(ordersItemList[i].product.id)) {
          ordersItemAdminList = ordersItemAdminList.map((ordersItemAdmin) =>
            countProductNumAllByProductId(ordersItemAdmin, ordersItemList, i)
          );
        } else {
          addNewOrdersItemAdmin(ordersItemAdminList, ordersItemList, i);
        }
      }
    }
    if (status === 'finished') {
      return orderByVendorDate(ordersItemAdminList);
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
          new Date(order.orders.purchaseDate) >= startDate &&
          new Date(order.orders.purchaseDate) <= endDate
        );
      });
    } else if (startDate && !endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return new Date(order.orders.purchaseDate) >= startDate;
      });
    } else if (!startDate && endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return new Date(order.orders.purchaseDate) <= endDate;
      });
    } else {
      return ordersItemsList;
    }
  };

  const dataRangeFilterHandler = () => {
    setAdminOrdersItems(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, nowStatus)),
        nowStatus
      )
    );
  };

  const resetHandler = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setAdminOrdersItems(
      getAdminOrdersList(
        filterOrdersByStatus(ordersItems, nowStatus),
        nowStatus
      )
    );
  };

  const showAll = () => {
    setNowStatus('all');
    setAdminOrdersItems(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'all')),
        'all'
      )
    );
  };

  const showPending = () => {
    setNowStatus('pending');
    setAdminOrdersItems(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'pending')),
        'pending'
      )
    );
  };

  const showFinished = () => {
    setNowStatus('finished');
    setAdminOrdersItems(
      getAdminOrdersList(
        filterOrdersByDateRange(filterOrdersByStatus(ordersItems, 'finished')),
        'finished'
      )
    );
  };

  const orderItemAdminGivenStatus = (
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
            setShowOrderMadeButton={setShowOrderMadeButton}
          />
        );
      case 'finished':
        return (
          <OrderItemAdminFinished
            order={item}
            setShowWindow={setShowWindow}
            setSelectedOrdersItemAdmin={setSelectedOrdersItemAdmin}
            setShowOrderMadeButton={setShowOrderMadeButton}
          />
        );
      default:
        return <OrderItemAdmin order={item} />;
    }
  };

  const showTitle = (titleId: string) => {
    if (titleId === 'salesOverview') {
      showAll();
    } else if (titleId === 'pendingOrder') {
      showPending();
    } else if (titleId === 'historicalOrder') {
      showFinished();
    } else {
      showAll();
    }
  };

  const refreshData = async (status: string) => {
    const ordersIdList: number[] = selectedOrdersItemAdmin.ordersList.map(
      (orders) => orders.id
    );
    http.post('/orders', ordersIdList).then(() => {
      http.get(`/orders`).then((response) => {
        const adminOrdersList = getAdminOrdersList(
          filterOrdersByDateRange(filterOrdersByStatus(response.data, status)),
          status
        );
        setOrdersItems(response.data);
        setShowWindow(false);
        setShowBanner(true);
        setAdminOrdersItems(adminOrdersList);
        setTimeout(() => {
          setShowBanner(false);
        }, 1500);
      });
    });
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
                  `order-status-label ${title.id} w-52 rounded-lg text-xl text-left font-semibold outline-0`,
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
      <div className="date-range-selection w-11/12 mx-auto mt-2 flex items-center">
        <Banner
          visible={showBanner}
          success={true}
          message={'Order is Made Successfully!'}
        />
        <div className="start-end-date-picker flex">
          <span className="mr-2 py-2 whitespace-nowrap font-semibold">
            Order Received From{' '}
          </span>
          <ReactDatePicker
            className="start-date bg-slate-100 rounded-lg w-28 py-2 text-center"
            selected={startDate}
            placeholderText="Time"
            onChange={(date: Date) => setStartDate(date)}
          />
          <span className="mx-2 py-2 font-semibold">To</span>
          <ReactDatePicker
            className="end-date bg-slate-100 rounded-lg w-28 py-2 text-center"
            selected={endDate}
            placeholderText="Time"
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <div className="apply-reset-button flex flex-1 justify-end">
          <button
            type="button"
            className="apply-button bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in duration-200 font-semibold shadow-md focus:ring-2 rounded-lg w-[80px] mr-[20px]"
            onClick={dataRangeFilterHandler}
          >
            Apply
          </button>
          <button
            type="button"
            className="reset-button add-in-cart-button py-2 px-4 flex bg-slate-100 hover:bg-slate-200 text-white transition ease-in duration-200 shadow-md focus:outline-none rounded-lg w-[50px]"
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
      <div className={`${selectedTitle === 0 ? '' : 'hidden'}`}>
        <HLine text="Kanban" />
        <div className="grid grid-cols-2">
          <ReactECharts option={goodOption} style={{ height: 500 }} />
          <ReactECharts option={categoryOption} style={{ height: 500 }} />
        </div>
        <HLine text="Orders" />
      </div>
      <div className="order-list mt-3 w-11/12 mx-auto">
        <ul className="flex flex-col">
          {adminOrdersItems.map((item: OrdersItemAdmin, index) => (
            <li
              key={index}
              className="order-item-admin product border-gray-400 mb-5 h-20 "
            >
              {orderItemAdminGivenStatus(item, nowStatus)}
            </li>
          ))}
        </ul>
      </div>
      <OrderDetailWindow
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        selectedOrdersItemAdmin={selectedOrdersItemAdmin}
        showOrderMadeButton={showOrderMadeButton}
        refreshData={refreshData}
      />
    </div>
  );
}
