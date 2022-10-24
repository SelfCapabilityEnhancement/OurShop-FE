import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { OrdersItemAdmin } from '@/components/common/CustomeTypes';

export default function OrderDetailWindow(props: {
  setShowWindow: any;
  showWindow: boolean;
  selectedOrdersItemAdmin: OrdersItemAdmin;
}) {
  function closeDetailWindow() {
    props.setShowWindow(false);
  }
  const selectedOrdersItemAdmin = props.selectedOrdersItemAdmin;
  return (
    <>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Order Detail
                  </Dialog.Title>
                  <div className="mt-2 flex">
                    <img
                      alt="profile"
                      src={selectedOrdersItemAdmin.product.images.split(',')[0]}
                      className="mx-auto object-cover rounded-lg"
                      data-testid="product-picture"
                    />
                    <p className="text-sm text-gray-500">
                      {selectedOrdersItemAdmin.product.name}
                    </p>
                  </div>
                  <div>
                    <p>Order Number: {selectedOrdersItemAdmin.productNumAll}</p>
                  </div>
                  <div>
                    <p>Buyer Information</p>
                    <p className="description bg-slate-100 rounded-xl h-[210px] py-3 px-3 text-l">
                      {selectedOrdersItemAdmin.ordersList.map(
                        (order) =>
                          // FIXME buyer information
                          order.userId + ' ' + order.orderAddress + '/r'
                      )}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDetailWindow}
                    >
                      Export to Excel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDetailWindow}
                    >
                      Order is Made
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
