import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Banner({
                                 visible,
                                 success,
                                 message,
                               }: { visible: boolean, success: boolean, message: string }) {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex mt-20 items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className={`${success ? 'bg-green-200' : 'bg-red-200'} transform overflow-hidden rounded-md p-3 text-left align-middle shadow-xl transition-all`}>
                <div className='flex flex-row items-center text-sm pr-5'>
                  <svg xmlns='http://www.w3.org/2000/svg'
                       fill='none'
                       viewBox='0 0 24 24'
                       strokeWidth={1.5}
                       stroke='currentColor'
                       className={`w-6 h-6 ${success ? 'text-green-600' : 'text-red-600'} mr-2`}>
                    <path strokeLinecap='round'
                          strokeLinejoin='round'
                          d={success ? 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'} />
                  </svg>
                  {message}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
