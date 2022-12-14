import { Dropdown } from 'rsuite';
import {
  StoreItem,
  OfficeItem,
} from '@/components/features/create-product/CreateProduct';
import React from 'react';

type Props = {
  storeItem: StoreItem;
  officeList: OfficeItem[];
  setStoreItem: (param: StoreItem, need2UpdateOfficeName?: boolean) => void;
  addStoreItem: () => void;
  deleteStoreItem: (id: number) => void;
  isMinCounts: boolean;
  isMaxCounts: boolean;
};

const dropdownStyle =
  'bg-gray-100 w-40 h-10 py-2 text-lg text-center text-gray-500';

export function OfficeStoreItem({
  storeItem,
  officeList,
  isMinCounts,
  isMaxCounts,
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

  return (
    <div className="flex">
      <Dropdown
        title={storeItem.officeName || 'Select an Office'}
        className={dropdownStyle}
        activeKey={storeItem.officeId}
        onSelect={selectCity}
        menuStyle={{ position: 'absolute' }}
      >
        {officeList.map((item) => (
          <Dropdown.Item
            active={item.id === storeItem.officeId}
            className={dropdownStyle}
            eventKey={item.id}
            key={item.id}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <span className="text-lg text-center mx-8 py-2">has</span>
      <input
        value={storeItem.inventory}
        className="w-52 h-10 py-2 bg-gray-100 text-lg text-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          className="w-10 h-10"
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
