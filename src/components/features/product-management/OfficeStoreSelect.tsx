import React, { Fragment } from 'react';
import {
  OfficeItem,
  OfficeAndStock,
  UserOffice,
} from '@/components/common/CustomTypes';
import { classNames } from '@/utils';
import { Listbox, Transition } from '@headlessui/react';

type Props = {
  index: number;
  storeItem: OfficeAndStock;
  officeList: OfficeItem[];
  setStoreItem: (
    param: OfficeAndStock,
    needToUpdateOfficeName: boolean,
    index: number
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
  'relative w-full cursor-default bg-[#F3F4F6] py-2 pl-3 pr-[1.5rem] text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm';
const inputClassName =
  'w-[120px] h-10 py-2 bg-gray-100 text-l text-center focus:outline-none focus:ring-2 focus:ring-purple-400';
const inputClassTitleName =
  'w-[120px] h-10 py-2 bg-gray-100 text-[0.9rem] text-center focus:outline-none focus:ring-2 focus:ring-purple-400';

export default function OfficeStoreSelect({
  index,
  storeItem,
  officeList,
  isMinCounts,
  isMaxCounts,
  error,
  setStoreItem,
  addStoreItem,
  deleteStoreItem,
}: Props) {
  const selectCity = (event: UserOffice, index: number) => {
    setStoreItem(
      { ...storeItem, officeId: event.id, officeName: event.name },
      true,
      index
    );
  };

  const changeInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreItem({ ...storeItem, stock: Number(value) }, false, index);
  };

  let dropDownClassName = classNames(
    dropDownItemClassName,
    storeItem.officeName === 'Select an Office' ? 'text-[#9DA3AE]' : ''
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
      <div className="">
        {/* @ts-ignore */}
        <Listbox
          value={storeItem.officeName}
          onChange={(event) => selectCity(event as any as UserOffice, index)}
        >
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
      </div>

      <span className="mx-[2%] py-2 text-center">has</span>
      <input
        data-testid="product-number"
        placeholder="Product Number"
        value={storeItem.stock === 0 ? '' : storeItem.stock}
        className={currentInputClassName}
        onChange={changeInventory}
      />
      <span className="mx-[2%] py-2 text-center">Available</span>
      {!isMaxCounts && (
        <svg
          d="1671700379772"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          data-testid="add-store-item"
          onClick={addStoreItem}
        >
          <path
            d="M512.2 64.2c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448z m163 416.4c18 0 32.6 14.6 32.6 32.6s-14.6 32.6-32.6 32.6H545.6v129.6c0 18-14.6 32.6-32.6 32.6s-32.6-14.6-32.6-32.6V545.8H350.8c-18 0-32.6-14.6-32.6-32.6s14.6-32.6 32.6-32.6h129.6V351c0-18 14.6-32.6 32.6-32.6s32.6 14.6 32.6 32.6v129.6h129.6z"
            fill="#22c55e"
          ></path>
        </svg>
      )}
      {!isMinCounts && (
        <svg
          d="1671700334164"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          data-testid="delete-store-item"
          onClick={() => deleteStoreItem(storeItem.officeId)}
        >
          <path
            d="M512.2 64.2c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448z m194.6 448c0 18-14.6 32.6-32.6 32.6H349.8c-18 0-32.6-14.6-32.6-32.6s14.6-32.6 32.6-32.6h324.5c17.9 0 32.5 14.6 32.5 32.6z"
            fill="#e11d48"
          ></path>
        </svg>
      )}
    </div>
  );
}
