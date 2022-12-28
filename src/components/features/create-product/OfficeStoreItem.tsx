import React, { Fragment } from 'react';
import { OfficeItem, StoreItem } from '@/components/common/CustomTypes';
import { classNames } from '@/utils';
import { Listbox, Transition } from '@headlessui/react';

type Props = {
  storeItem: StoreItem;
  officeList: OfficeItem[];
  setStoreItem: (param: StoreItem, need2UpdateOfficeName?: boolean) => void;
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
  'bg-gray-100 w-40 h-10 py-2 text-lg text-center text-gray-900';
const inputClassName =
  'w-50 h-10 py-2 bg-gray-100 text-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-400';

export default function OfficeStoreItem({
  storeItem,
  officeList,
  isMinCounts,
  isMaxCounts,
  error,
  setStoreItem,
  addStoreItem,
  deleteStoreItem,
}: Props) {
  const selectCity = (officeId: number) => {
    setStoreItem({ ...storeItem, officeId }, true);
  };

  const changeInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreItem({ ...storeItem, inventory: Number(value) });
  };

  let dropDownClassName = classNames(
    dropDownItemClassName,
    storeItem.officeName ? '' : 'text-slate-400'
  );
  if (error.office) {
    dropDownClassName += ' outline-none ring-2 ring-rose-500';
  }

  let currentInputClassName = inputClassName;
  if (error.inventory) {
    currentInputClassName += ' outline-none ring-2 ring-rose-500';
  }

  return (
    <div className="flex">
      <div className="">
        <Listbox value={storeItem.officeId} onChange={selectCity}>
          <div className="relative mt-1 w-[150px]">
            <Listbox.Button
              className={dropDownClassName}
              data-testid="drop-down"
            >
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-[#F3F4F6] py-1 text-center ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {officeList.map((city) => (
                  <Listbox.Option
                    key={city.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? 'text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={city.id}
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
      </div>
      <span className="text-lg text-center mx-8 py-2">has</span>
      <input
        type="number"
        placeholder="Number of Products"
        value={storeItem.inventory === 0 ? '' : storeItem.inventory}
        className={currentInputClassName}
        onChange={changeInventory}
      />
      <span className="text-lg text-center mx-8 py-2">Available</span>
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
          onClick={() => deleteStoreItem(storeItem.id)}
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
