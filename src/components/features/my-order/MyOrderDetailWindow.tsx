import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { OrdersItem } from '@/components/common/CustomTypes';

export default function MyOrderDetailWindow({
  selectedOrdersItem,
  onClose,
}: {
  selectedOrdersItem?: OrdersItem;
  onClose: () => void;
}) {
  return (
    <Transition appear show={!!selectedOrdersItem} as={Fragment}>
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
              <Dialog.Panel className="w-96 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="grid text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="justify-self-center font-semibold">
                    Order Detail
                  </div>
                </Dialog.Title>
                <div className="mx-2 mt-2 flex">
                  <img
                    alt="profile"
                    src={selectedOrdersItem?.images.split(',')[0]}
                    className="my-2 mx-2 h-20 w-20 rounded-lg object-cover"
                    data-testid="product-picture"
                  />
                  <p className="mx-4 mt-8 text-center text-base font-semibold">
                    {selectedOrdersItem?.productName}
                  </p>
                </div>
                <p className="m-4 text-base" data-testid="purchase-number">
                  <span className="text-base font-semibold">Number</span>:{' '}
                  {selectedOrdersItem?.purchaseNum}
                </p>
                <p className="m-4 text-base" data-testid="purchase-date">
                  <span className="text-base font-semibold">
                    Date of Purchase
                  </span>
                  : {selectedOrdersItem?.purchaseDate}
                </p>
                <p className="m-4 text-base" data-testid="address">
                  <span className="text-base font-semibold">Address</span>:{' '}
                  {selectedOrdersItem?.address}
                </p>
                <p className="m-4 text-base" data-testid="order-status">
                  <span className="text-base font-semibold">Order Status</span>:{' '}
                  {selectedOrdersItem?.status}
                </p>
                <div className="mt-20 flex justify-end">
                  <button
                    type="button"
                    className="mr-[20px] h-8 w-[120px] rounded-lg bg-violet-500 font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-violet-700 focus:ring-2 focus:ring-purple-500"
                    onClick={onClose}
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
