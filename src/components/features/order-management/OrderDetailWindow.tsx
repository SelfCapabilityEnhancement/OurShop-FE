import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { OrdersItemAdmin } from '@/components/common/CustomTypes';
import BuyerInfoTable from '@/components/features/order-management/BuyerInfoTable';
import * as XLSX from 'xlsx';
import CancelIcon from '@/components/common/cancel-icon/Cancel-icon';

export default function OrderDetailWindow(props: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  showWindow: boolean;
  selectedOrdersItemAdmin: OrdersItemAdmin;
  showOrderMadeButton: boolean;
  refreshData: Function;
}) {
  const [buttonEnabled, setButtonEnabled] = useState(true);

  useEffect(() => {
    setButtonEnabled(true);
  }, [props.showWindow]);

  function closeDetailWindow() {
    props.setShowWindow(false);
  }

  const selectedOrdersItemAdmin = props.selectedOrdersItemAdmin;

  const handleOrderMade = async () => {
    setButtonEnabled(false);
    props.refreshData('Pending');
  };

  const toExcel = useCallback(async () => {
    const table = document.getElementById('BuyerInfoTable');
    const sheet = XLSX.utils.table_to_sheet(table);
    const wb = {
      Sheets: { buyersInfo: sheet },
      SheetNames: ['buyersInfo'],
    };
    XLSX.writeFile(
      wb,
      `${selectedOrdersItemAdmin.productName + '_BuyerInfo.xlsx'}`
    );
  }, [selectedOrdersItemAdmin]);

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
                  <div className="justify-self-center font-semibold">
                    Order Detail
                  </div>
                  <div className="justify-self-end" data-testid="cancel-icon">
                    <CancelIcon handleClose={closeDetailWindow} />
                  </div>
                </Dialog.Title>
                <div className="mt-2 flex mx-2">
                  <img
                    alt="profile"
                    src={selectedOrdersItemAdmin.images.split(',')[0]}
                    className="my-2 mx-2 object-cover rounded-lg w-24 h-24"
                    data-testid="product-picture"
                  />
                  <p className="text-base font-semibold mx-auto mt-3 text-black text-center">
                    {selectedOrdersItemAdmin.productName}
                  </p>
                </div>
                <div>
                  <p className="text-base mx-2 my-1">
                    Order Number: {selectedOrdersItemAdmin.productNumAll}
                  </p>
                </div>
                <div className="mx-2">
                  <p className="text-base my-1">Buyer Information: </p>
                  <div
                    className="description bg-slate-100 rounded-xl h-[210px] overflow-auto"
                    data-testid="buyer-info-list"
                  >
                    <BuyerInfoTable
                      selectedOrdersItemAdmin={selectedOrdersItemAdmin}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-evenly">
                  {props.showOrderMadeButton ? (
                    ''
                  ) : (
                    <div className="flex-1"></div>
                  )}
                  <button
                    type="button"
                    className="text-sm px-5 py-2.5 mb-2 mx-5 bg-blue-600 hover:bg-blue-800 text-white transition ease-in duration-200 font-semibold shadow-md rounded-lg"
                    data-testid="export-excel"
                    onClick={toExcel}
                  >
                    Export to Excel
                  </button>
                  {props.showOrderMadeButton ? (
                    <div className="flex-1"></div>
                  ) : (
                    ''
                  )}
                  {props.showOrderMadeButton ? (
                    <button
                      className="order-made text-sm px-5 py-2.5 mb-2 mx-5 bg-violet-500 hover:bg-violet-700 text-white transition ease-in duration-200 font-semibold shadow-md rounded-lg disabled:opacity-50"
                      data-testid="order-made"
                      disabled={!buttonEnabled}
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
