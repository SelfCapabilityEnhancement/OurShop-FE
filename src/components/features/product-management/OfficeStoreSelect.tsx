import { Dropdown } from 'rsuite';
import React from 'react';
import { OfficeItem, OfficeAndStock } from '@/components/common/CustomTypes';
import { classNames } from '@/utils';

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
  'bg-gray-100 w-[150px] text-xl h-10 py-2 text-center text-gray-900';
const dropDownTitleClassName =
  'bg-gray-100 w-[150px] text-[0.25rem] h-10 py-2 text-center text-gray-900';
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
  const selectCity = (officeId: number) => {
    setStoreItem({ ...storeItem, officeId }, true);
  };

  const changeInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreItem({ ...storeItem, stock: Number(value) });
  };

  let dropDownClassName = classNames(
    dropDownItemClassName,
    // storeItem.officeName ? '' : 'text-slate-400'
    storeItem.officeName === '' ? dropDownTitleClassName : ''
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
      <Dropdown
        title={storeItem.officeName || 'Select an Office'}
        className={
          // storeItem.officeName === ''
          //   ? dropDownTitleClassName
          //   : dropDownClassName
          dropDownClassName
        }
        placement="bottomEnd"
        activeKey={storeItem.officeId}
        onSelect={selectCity}
        menuStyle={{ position: 'absolute' }}
        data-testid="drop-down"
        noCaret
      >
        {officeList.map((item) => (
          <Dropdown.Item
            active={item.id === storeItem.officeId}
            className={dropDownItemClassName}
            eventKey={item.id}
            key={item.id}
            data-testid="drop-down-item"
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <span className="h-10 bg-[#F3F4F6]">
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          strokeWidth="1"
          fill="white"
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
