import React, { Fragment } from 'react';
import {
  OfficeItem,
  OfficeAndStock,
  UserOffice as Office,
} from '@/components/common/CustomTypes';
import { classNames } from '@/utils';
import { Listbox, Transition } from '@headlessui/react';

type Props = {
  storeItem: OfficeAndStock;
  officeList: OfficeItem[];
  setStoreItem: (
    param: OfficeAndStock,
    need2UpdateOfficeName?: boolean
  ) => void;
  addStoreItem: () => void;
  deleteStoreItem: (id: number) => void;
  isMinCounts: boolean;
  isMaxCounts: boolean;
  error: {
    office: boolean;
    inventory: boolean;
  };
};

const dropDownItemClassName =
  'relative w-full cursor-default bg-[#F3F4F6] py-2 pl-3 pr-10 text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm';
const inputClassName =
  'w-[120px] h-10 py-2 bg-gray-100 text-l text-center focus:outline-none focus:ring-2 focus:ring-purple-400';
const inputClassTitleName =
  'w-[120px] h-10 py-2 bg-gray-100 text-[0.25rem] text-center focus:outline-none focus:ring-2 focus:ring-purple-400';

export default function OfficeStoreSelect({
  storeItem,
  officeList,
  isMinCounts,
  isMaxCounts,
  error,
  setStoreItem,
  addStoreItem,
  deleteStoreItem,
}: Props) {
  const selectCity = (event: Office) => {
    setStoreItem(
      { ...storeItem, officeId: event.id, officeName: event.name },
      true
    );
  };

  const changeInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreItem({ ...storeItem, stock: Number(value) });
  };

  let dropDownClassName = classNames(
    dropDownItemClassName,
    storeItem.officeName === 'Select Office' ? 'text-[#9DA3AE]' : ''
  );
  if (error.office) {
    dropDownClassName += ' outline-none ring-2 ring-rose-500';
  }

  let currentInputClassName =
    storeItem.stock === 0 ? inputClassTitleName : inputClassName;
  if (error.inventory) {
    currentInputClassName += ' outline-none ring-2 ring-rose-500';
  }

  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Listbox
        value={storeItem.officeName}
        onChange={(event) => selectCity(event)}
      >
        <div className="relative mt-1 w-[150px]">
          <Listbox.Button className={dropDownClassName}>
            <span className="block truncate">{storeItem.officeName}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="png"
                  fill={'rgb(217 217 217)'}
                  d="M18 15l-6-6l-6 6h12"
                  transform="rotate(180 12 12)"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto bg-[#F3F4F6] py-1 text-center ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {officeList.map((city) => (
                <Listbox.Option
                  key={city.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? 'text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={city}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {city.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <span className="text-center mx-[2%] py-2">has</span>
      <input
        type="number"
        placeholder="Product Number"
        value={storeItem.stock === 0 ? '' : storeItem.stock}
        className={currentInputClassName}
        onChange={changeInventory}
      />
      <span className="text-center mx-[2%] py-2">Available</span>
      {!isMaxCounts && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#22c55e"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="white"
          className="w-12 h-12"
          data-testid="add-store-item"
          onClick={addStoreItem}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {!isMinCounts && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#e11d48"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-12 h-12 mx-2"
          data-testid="delete-store-item"
          onClick={() => deleteStoreItem(storeItem.officeId)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
}
