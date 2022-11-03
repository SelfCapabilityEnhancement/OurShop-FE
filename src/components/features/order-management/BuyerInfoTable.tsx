import { mockBuyerInfos, tempProducts } from '@/mocks/mockData';

const mockProduct = tempProducts[0];

export default function BuyerInfoTable() {
  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Buyer Name
              </th>
              <th scope="col" className="py-3 px-6">
                Product Name
              </th>
              <th scope="col" className="py-3 px-6">
                Number of Product
              </th>
              <th scope="col" className="py-3 px-6">
                Received Address
              </th>
              <th scope="col" className="py-3 px-6">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {mockBuyerInfos.map((mockBuyerInfo, index) => {
              return (
                <tr
                  className={`buyer-info-line border-b ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  key={index}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {mockBuyerInfo.user.name}
                  </th>
                  <td className="py-4 px-6">{mockProduct.name}</td>
                  <td className="py-4 px-6">{mockBuyerInfo.productNum}</td>

                  <td className="py-4 px-6">
                    {mockBuyerInfo.orders.orderAddress}
                  </td>
                  <td className="py-4 px-6">
                    {mockBuyerInfo.user.bankAccount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
