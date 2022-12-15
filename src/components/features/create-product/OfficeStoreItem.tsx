import { Dropdown } from 'rsuite';
import React from 'react';
import { OfficeItem, StoreItem } from '@/components/common/CustomTypes';

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
  'bg-gray-100 w-40 h-10 py-2 text-lg text-center text-gray-500';
const inputClassName =
  'w-48 h-10 py-2 bg-gray-100 text-lg text-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400';

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
  console.log(error);

  const selectCity = (officeId: number) => {
    setStoreItem({ ...storeItem, officeId }, true);
  };

  const changeInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStoreItem({ ...storeItem, inventory: Number(value) });
  };

  let dropDownClassName = dropDownItemClassName;
  if (error.office) {
    dropDownClassName += ' border-2 border-red-500';
  }

  let currentInputClassName = inputClassName;
  if (error.inventory) {
    currentInputClassName += ' border-2 border-red-500';
  }

  return (
    <div className="flex">
      <Dropdown
        title={storeItem.officeName || 'Select an Office'}
        className={dropDownClassName}
        activeKey={storeItem.officeId}
        onSelect={selectCity}
        menuStyle={{ position: 'absolute' }}
      >
        {officeList.map((item) => (
          <Dropdown.Item
            active={item.id === storeItem.officeId}
            className={dropDownItemClassName}
            eventKey={item.id}
            key={item.id}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="green"
          className="w-10 h-10"
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="red"
          className="w-10 h-10 mx-2"
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
