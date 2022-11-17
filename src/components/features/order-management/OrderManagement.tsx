import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrdersItem, OrdersItemAdmin } from '@/components/common/CustomTypes';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import OrderDetailWindow from '@/components/features/order-management/OrderDetailWindow';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { getAllOrdersItems, updateOrders } from '@/service';
import ReactECharts from 'echarts-for-react';
// @ts-ignore
import cloneDeep from 'lodash.clonedeep';

import HLine from '@/components/common/horizontal-line/HorizontalLine';
import Banner from '@/components/common/banner/Banner';
import { initCategoryOption, initGoodOption } from '@/constants';

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
    getAllOrdersItems().then((data) => {
      setOrdersItems(data);
      setAdminOrdersItems(getAdminOrdersList(data, 'all'));
    });
  }, []);

  useEffect(() => {
    const sortedItems = [...adminOrdersItems].sort((a, b) => {
      return a.productNumAll > b.productNumAll ? -1 : 1;
    });

    setGoodOption((prevState) => {
      const tmp = cloneDeep(prevState);
      tmp.yAxis.data = sortedItems.map((a) => a.productName);
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
      productId: 0,
      productName: '',
      description: '',
      images: '',
      productNumAll: 0,
      ordersList: [
        {
          orderId: 0,
          userId: 0,
          vendorDate: new Date(''),
          address: '',
          purchaseDate: new Date(''),
          status: '',
          purchaseNum: 0,
          username: '',
          telephoneNum: '',
        },
      ],
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
    ordersItemAdmin.productId === ordersItemList[index].productId
      ? {
          ...ordersItemAdmin,
          productNumAll:
            ordersItemAdmin.productNumAll + ordersItemList[index].purchaseNum,
          ordersList: [
            ...ordersItemAdmin.ordersList,
            {
              orderId: ordersItemList[index].orderId,
              userId: ordersItemList[index].userId,
              vendorDate: ordersItemList[index].vendorDate,
              address: ordersItemList[index].address,
              purchaseDate: ordersItemList[index].purchaseDate,
              status: ordersItemList[index].status,
              purchaseNum: ordersItemList[index].purchaseNum,
              username: ordersItemList[index].username,
              telephoneNum: ordersItemList[index].telephoneNum,
            },
          ],
        }
      : ordersItemAdmin;

  const countProductNumAllByProductIdAndVendorDate = (
    ordersItemAdmin: OrdersItemAdmin,
    ordersItemList: OrdersItem[],
    index: number,
    date: Date
  ) =>
    ordersItemAdmin.productId === ordersItemList[index].productId &&
    ordersItemAdmin.ordersList[0].vendorDate === date
      ? {
          ...ordersItemAdmin,
          productNumAll:
            ordersItemAdmin.productNumAll + ordersItemList[index].purchaseNum,
          ordersList: [
            ...ordersItemAdmin.ordersList,
            {
              orderId: ordersItemList[index].orderId,
              userId: ordersItemList[index].userId,
              vendorDate: ordersItemList[index].vendorDate,
              address: ordersItemList[index].address,
              purchaseDate: ordersItemList[index].purchaseDate,
              status: ordersItemList[index].status,
              purchaseNum: ordersItemList[index].purchaseNum,
              username: ordersItemList[index].username,
              telephoneNum: ordersItemList[index].telephoneNum,
            },
          ],
        }
      : ordersItemAdmin;

  const addNewOrdersItemAdmin = (
    ordersItemAdminList: OrdersItemAdmin[],
    ordersItemList: OrdersItem[],
    index: number
  ) => {
    ordersItemAdminList.push({
      productId: ordersItemList[index].productId,
      productName: ordersItemList[index].productName,
      description: ordersItemList[index].description,
      images: ordersItemList[index].images,
      productNumAll: ordersItemList[index].purchaseNum,
      ordersList: [
        {
          orderId: ordersItemList[index].orderId,
          userId: ordersItemList[index].userId,
          vendorDate: ordersItemList[index].vendorDate,
          address: ordersItemList[index].address,
          purchaseDate: ordersItemList[index].purchaseDate,
          status: ordersItemList[index].status,
          purchaseNum: ordersItemList[index].purchaseNum,
          username: ordersItemList[index].username,
          telephoneNum: ordersItemList[index].telephoneNum,
        },
      ],
    });
  };

  function getAdminOrdersList(ordersItemList: OrdersItem[], status: string) {
    let ordersItemAdmins: OrdersItemAdmin[] = [];
    for (let i: number = 0; i < ordersItemList.length; i++) {
      const productIds: number[] = [];
      ordersItemAdmins.forEach((ordersItemAdmin) => {
        productIds.push(ordersItemAdmin.productId);
      });
      const vendorDates: String[] = [];
      if (status === 'finished') {
        ordersItemAdmins.forEach((ordersItemAdmin) => {
          vendorDates.push(ordersItemAdmin.ordersList[0].vendorDate.toString());
        });
      }
      const dateOrder = ordersItemList[i].vendorDate;
      if (status === 'finished') {
        if (
          productIds.includes(ordersItemList[i].productId) &&
          vendorDates.includes(dateOrder.toString())
        ) {
          ordersItemAdmins = ordersItemAdmins.map((ordersItemAdmin) =>
            countProductNumAllByProductIdAndVendorDate(
              ordersItemAdmin,
              ordersItemList,
              i,
              dateOrder
            )
          );
        } else {
          addNewOrdersItemAdmin(ordersItemAdmins, ordersItemList, i);
        }
      }
      if (status !== 'finished') {
        if (productIds.includes(ordersItemList[i].productId)) {
          ordersItemAdmins = ordersItemAdmins.map((ordersItemAdmin) =>
            countProductNumAllByProductId(ordersItemAdmin, ordersItemList, i)
          );
        } else {
          addNewOrdersItemAdmin(ordersItemAdmins, ordersItemList, i);
        }
      }
    }
    if (status === 'finished') {
      return orderByVendorDate(ordersItemAdmins);
    }
    return ordersItemAdmins;
  }

  const filterOrdersByStatus = (
    ordersItemList: OrdersItem[],
    status: string
  ) => {
    if (status === 'all') {
      return ordersItemList;
    } else {
      return ordersItemList.filter(
        (ordersItem) => ordersItem.status === status
      );
    }
  };

  const filterOrdersByDateRange = (ordersItemsList: OrdersItem[]) => {
    startDate?.setHours(0, 0, 0);
    endDate?.setHours(23, 59, 59);
    if (startDate && endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return (
          new Date(order.purchaseDate) >= startDate &&
          new Date(order.purchaseDate) <= endDate
        );
      });
    } else if (startDate && !endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return new Date(order.purchaseDate) >= startDate;
      });
    } else if (!startDate && endDate) {
      return ordersItemsList.filter((order: OrdersItem) => {
        return new Date(order.purchaseDate) <= endDate;
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
    const ordersProductIds: { orderId: number; productId: number }[] =
      selectedOrdersItemAdmin.ordersList.map((orders) => {
        return {
          orderId: orders.orderId,
          productId: selectedOrdersItemAdmin.productId,
        };
      });
    updateOrders(ordersProductIds).then(() => {
      getAllOrdersItems().then((data) => {
        const adminOrdersList = getAdminOrdersList(
          filterOrdersByDateRange(filterOrdersByStatus(data, status)),
          status
        );
        setOrdersItems(data);
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
      <div className="date-range-selection  mx-auto mt-2 flex items-center">
        <Banner
          visible={showBanner}
          success={true}
          message={'Order is Made Successfully!'}
        />
        <div className="start-end-date-picker flex mb-4">
          <span className="ml-5 mr-2 py-2 whitespace-nowrap font-semibold">
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
        <div className="apply-reset-button flex flex-1 ml-6 mb-4">
          <button
            type="button"
            className="apply-button bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in duration-200 font-semibold shadow-md focus:ring-2 rounded-lg w-[80px] h-10 mr-[20px]"
            onClick={dataRangeFilterHandler}
          >
            Apply
          </button>
          <button
            type="button"
            className="reset-button add-in-cart-button py-2 px-4 flex bg-slate-100 hover:bg-slate-200 text-white transition ease-in duration-200 shadow-md focus:outline-none rounded-lg w-[50px] h-10"
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
              <OrderItemAdmin
                order={item}
                nowStatus={nowStatus}
                setShowWindow={setShowWindow}
                setSelectedOrdersItemAdmin={setSelectedOrdersItemAdmin}
                setShowOrderMadeButton={setShowOrderMadeButton}
              />
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
