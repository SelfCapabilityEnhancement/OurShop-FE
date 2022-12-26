import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CancelIcon from '@/components/common/cancel-icon/Cancel-icon';
import { Account } from '@/components/common/CustomTypes';
import { initAccount } from '@/constants';

const roles = ['Buyer', 'Platform Ops', 'Site Admin'];

export default function AccessRole({
  isOpen,
  handleClose,
  oldAccount,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldAccount: Account;
}) {
  const [account, setAccount] = useState<Account>(initAccount);

  useEffect(() => {
    setAccount(oldAccount);
  }, [isOpen]);

  const renderRole = (item: string) => {
    return (
      <button
        key={item}
        className="w-44 h-9 text-center text-sm text-white font-normal py-2 rounded-lg mb-80 bg-[#AE66C3]"
      >
        {item}
      </button>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="mx-[30%] relative z-10 justify-center"
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="absolute top-[-1300px] w-[600px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle transition-all">
            <Dialog.Title as="h1" className="leading-6 grid grid-cols-3">
              <div></div>
              <div className="text-[#A45FB7] flex text-[18px] content-center font-semibold my-[20%]">
                Access Configuration
              </div>
              <div className="justify-self-end" data-testid="cancel-icon">
                <CancelIcon handleClose={handleClose} />
              </div>
            </Dialog.Title>

            <div className="col-span-2">
              <div className="text-xl text-gray-900 mb-8">
                Please select role for the user {account.username}
              </div>
              <div className="flex justify-start gap-6 mt-3">
                {roles.map((item) => renderRole(item))}
              </div>
            </div>

            <div className="flex justify-end mr-8">
              <button className="text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-2xl text-2xl w-44 h-12 px-5 py-2 text-center">
                Save
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
