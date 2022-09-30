import React, { useState } from 'react';
import OrderItemAdmin from '@/components/features/order-management/OrderItemAdmin';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const orders = [
  {
    id: 1,
    productId: 1,
    productName: 'Product Name 1',
    purchaseDate: '11.10.2022',
    purchaseNumber: '1',
  },
  {
    id: 2,
    productId: 1,
    productName: 'Product Name 1',
    purchaseDate: '11.10.2022',
    purchaseNumber: '1',
  },
  {
    id: 3,
    productId: 2,
    productName: 'Product Name2',
    purchaseDate: '11.12.2022',
    purchaseNumber: '2',
  },
];

export default function OrderManagement() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  return (
    <div className="mt-10 ml-10">
      <div className="date-range-selection w-11/12 absolute">
        <div className="start-end-date-picker flex absolute top-1">
          <span className="mr-[10px] py-2">From</span>
          <ReactDatePicker
            className="bg-slate-100 rounded-lg w-[100px] py-2 text-center"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
          <span className="mx-[10px] py-2">To</span>
          <ReactDatePicker
            className="bg-slate-100 rounded-lg w-[100px] py-2 text-center"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <div className="apply-reset-button flex absolute right-0">
          <button
            type="button"
            className="apply-button py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[80px] mr-[20px]"
          >
            Apply
          </button>
          <button
            type="button"
            className="reset-button add-in-cart-button py-2 px-4 flex justify-center items-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-300 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-[50px]"
          >
            <svg
              className="h-8 w-8 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        </div>
      </div>
      <div className="order-list w-11/12 mx-auto absolute top-[200px]">
        <ul className="flex flex-col">
          {orders.map((item) => (
            <li
              key={item.id}
              className="order-item-admin product border-gray-400 mb-5 h-20 "
            >
              <OrderItemAdmin order={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
