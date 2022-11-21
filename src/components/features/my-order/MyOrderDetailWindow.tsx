import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { OrdersItem } from '@/components/common/CustomTypes';

export default function MyOrderDetailWindow({
  showWindow,
  setShowWindow,
  selectedOrdersItem,
}: {
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOrdersItem: OrdersItem;
}) {
  function closeMyOrderDetailWindow() {
    setShowWindow(false);
  }

  return (
    <Transition appear show={showWindow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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

        <div className="fixed inset-0 overflow-y-auto ">
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
                  className="text-lg font-medium leading-6 text-gray-900 grid"
                >
                  <div className="justify-self-center font-semibold">
                    Order Detail
                  </div>
                </Dialog.Title>
                <div className="mt-2 flex mx-2">
                  <img
                    alt="profile"
                    src={selectedOrdersItem.images.split(',')[0]}
                    className="my-2 mx-2 object-cover rounded-lg w-20 h-20"
                    data-testid="product-picture"
                  />
                  <p className="text-base font-semibold mx-4 mt-8 text-center">
                    {selectedOrdersItem.productName}
                  </p>
                </div>
                <div>
                  <p className="text-base m-3" data-testid="purchase-number">
                    Number: {selectedOrdersItem.purchaseNum}
                  </p>
                </div>
                <div>
                  <p className="text-base m-3" data-testid="purchase-date">
                    Date of Purchase: {selectedOrdersItem.purchaseDate}
                  </p>
                </div>
                <div>
                  <p className="text-base m-3" data-testid="address">
                    Address: {selectedOrdersItem.address}
                  </p>
                </div>
                <div>
                  <p className="text-base m-3" data-testid="order-status">
                    Order Status: {selectedOrdersItem.status}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in duration-200 font-semibold shadow-md focus:ring-2 rounded-lg w-[120px] h-8 mr-[20px]"
                    onClick={closeMyOrderDetailWindow}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
