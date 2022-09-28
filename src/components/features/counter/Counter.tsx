import React, { useState } from 'react';

export default function Counter() {
  const [num, setNum] = useState(1);

  function handleMinus() {
    if (num > 1) {
      setNum(num - 1);
    }
  }

  function handlePlus() {
    setNum(num + 1);
  }

  return (
    <div className="flex gap-48 mt-4" data-testid="counter">
      <span className="my-auto mb-2 text-2xl">No. of purchase</span>
      <div className="flex">
        <svg
          data-testid="svg-minus"
          onClick={handleMinus}
          className="h-8 w-8"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="gray"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M18 15l-6-6l-6 6h12" transform="rotate(270 12 12)" />
        </svg>
        <span data-testid="num" className="my-auto mb-2 text-2xl">{num}</span>
        <svg
          data-testid="svg-plus"
          onClick={handlePlus}
          className="h-8 w-8"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="gray"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
        </svg>
      </div>
    </div>
  );
}
