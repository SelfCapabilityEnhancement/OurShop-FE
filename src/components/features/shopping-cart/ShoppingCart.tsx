
export default function ShoppingCart() {
  const products = [
    {name: 'Product1', token: 5, count: 1},
    {name: 'Product2', token: 3, count: 2},
    {name: 'Product3', token: 2, count: 3},
  ];

  return (
    <div className="w-[1280px] mx-auto mt-5">
      <ul className="flex flex-col">
        {products.map(({name, count}, index) => {
          return (
            <li key={`product-${index}`} className="product border-gray-400 my-5 h-20">
              <div className="flex flex-row transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md items-center p-4">
                <div className="w-20 h-16 flex-initial mx-5">
                  <img alt="profile"
                       src="src/assets/images/product/product1.png"
                       className="mx-auto object-cover rounded-lg" />
                </div>
                <label htmlFor="product-checkbox-1"
                       className="font-medium dark:text-white flex-auto mx-5">
                  {name}
                </label>
                <div className="font-medium dark:text-white flex-auto">
                  Number {count}
                </div>
                <input id={`product-checkbox-${index}`}
                       type="checkbox"
                       value=""
                       className="w-6 h-6 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
