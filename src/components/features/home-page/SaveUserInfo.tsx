import { UserInfo } from '@/components/common/CustomTypes';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

const basicForm: { id: keyof UserInfo; label: string; type: string }[] = [
  { id: 'userRealName', label: 'Name', type: 'string' },
  { id: 'telephoneNum', label: 'Phone', type: 'number' },
  { id: 'officeId', label: 'Select an Office', type: 'number' },
];

export default function SaveUserInfo({ isOpen }: { isOpen: boolean }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="mx-auto container flex items-center" id="nav">
        <div className="w-full pt-2 p-4">
          <div className="mx-auto md:p-6 md:w-1/3">
            <div className="bg-[#EEEEEE] shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p className="mt-6 text-center text-3xl text-purple-400 font-normal">
                Welcome
              </p>
              <p className="mt-6 h-14 text-center text-lg text-black-500">
                Please fill some information before purchases
              </p>
              <form>
                {basicForm.map(({ id, label }) => (
                  <div key={id} className="mb-8">
                    <label
                      htmlFor={id}
                      className="block text-gray-700 text-sm mb-2"
                    >
                      {label}
                      <span className="text-red-500">&nbsp;*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id={id}
                        className="block pr-10 bg-inherit shadow border-solid border border-black rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-purple-300 transition duration-500 ease-in-out"
                      />
                    </div>
                  </div>
                ))}

                <div className="mb-4 ml-[70%]">
                  <button
                    className="transition duration-500 bg-violet-500 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 ease-in duration-200 font-medium rounded-2xl text-lg font-bold py-2 px-10 rounded "
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
