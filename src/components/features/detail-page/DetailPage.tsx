import React from 'react';
import Counter from '@/components/features/counter/Counter';

export default function DetailPage() {
  return (
    <div className="DetailPage">
      <h2>here is a book name xxxx</h2>
      <p className="price">price: 111 or 5 token</p>
      <h2>description</h2>
      <p className="description">xxx</p>
      <div className="PurchaseNumber">
        <Counter />
      </div>
      <button className="rounded-lg bg-violet-800 mr-4 p-2 text-white add-in-cart-button">add in shopping cart</button>
        <button className="rounded-lg bg-violet-800 p-2 text-white purchase-button">purchase</button>
    </div>
  );
}
