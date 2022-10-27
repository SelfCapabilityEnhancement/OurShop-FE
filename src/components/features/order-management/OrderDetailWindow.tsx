import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { OrdersItem, OrdersItemAdmin } from '@/components/common/CustomeTypes';
import { http } from '@/service';

export default function OrderDetailWindow(props: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  showWindow: boolean;
  selectedOrdersItemAdmin: OrdersItemAdmin;
  showOrderMadeButton: boolean;
  ordersItems: OrdersItem[];
  setOrdersItems: React.Dispatch<React.SetStateAction<OrdersItem[]>>;
  setAdminOrdersItemList: React.Dispatch<
    React.SetStateAction<OrdersItemAdmin[]>
  >;
  getAdminOrdersList: Function;
  filterOrdersByStatus: Function;
}) {
  function closeDetailWindow() {
    props.setShowWindow(false);
  }

  const selectedOrdersItemAdmin = props.selectedOrdersItemAdmin;

  const handleOrderMade = async () => {
    const ordersIdList: number[] = selectedOrdersItemAdmin.ordersList.map(
      (orders) => orders.id
    );

    await http
      .post('/orders', ordersIdList)
      // eslint-disable-next-line no-console
      .catch(console.error);

    props.setShowWindow(false);
    const updatedordersItems = props.ordersItems.map((ordersItem) =>
      ordersIdList.includes(ordersItem.orders.id)
        ? {
            ...ordersItem,
            orders: {
              ...ordersItem.orders,
              orderStatus: 'finished',
            },
          }
        : ordersItem
    );
    props.setOrdersItems(updatedordersItems);
    props.setAdminOrdersItemList(
      props.getAdminOrdersList(
        props.filterOrdersByStatus(updatedordersItems, 'pending')
      )
    );
  };
  return (
    <Transition appear show={props.showWindow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDetailWindow}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 grid grid-cols-3"
                >
                  <div></div>
                  <div className="justify-self-center">Order Detail</div>
                  <div className="justify-self-end" data-testid="cancel-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={closeDetailWindow}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </Dialog.Title>
                <div className="mt-2 flex">
                  <img
                    alt="profile"
                    src={selectedOrdersItemAdmin.product.images.split(',')[0]}
                    className="ml-2 object-cover rounded-lg w-16 h-16 border-pink-500 clear-left"
                    data-testid="product-picture"
                  />
                  <p className="text-base text-black ml-10 my-4">
                    {selectedOrdersItemAdmin.product.name}
                  </p>
                </div>
                <div>
                  <p className="text-base ml-2">
                    Order Number: {selectedOrdersItemAdmin.productNumAll}
                  </p>
                </div>
                <div>
                  <p className="ml-2">Buyer Information</p>
                  <p
                    className="description bg-slate-100 rounded-xl h-[210px] py-3 px-3 text-base"
                    data-testid="buyer-info-list"
                  >
                    userId Order Address <br />
                    {selectedOrdersItemAdmin.ordersList.map((order, index) => (
                      // FIXME buyer information
                      <p key={index}>
                        {order.userId} {order.orderAddress}
                      </p>
                    ))}
                  </p>
                </div>
                <div className="mt-4 flex justify-evenly">
                  <button
                    type="button"
                    className="inline-flex rounded-md border border-transparent bg-indigo-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    data-testid="export-excel"
                  >
                    Export to Excel
                  </button>
                  {props.showOrderMadeButton ? (
                    <button
                      className="inline-flex rounded-md border border-transparent bg-fuchsia-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      data-testid="order-made"
                      onClick={handleOrderMade}
                    >
                      Order is Made
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
