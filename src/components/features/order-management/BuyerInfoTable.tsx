import { OrdersItemAdmin } from '@/components/common/CustomTypes';

export default function BuyerInfoTable(props: {
  selectedOrdersItemAdmin: OrdersItemAdmin;
}) {
  const selectedOrdersItemAdmin = props.selectedOrdersItemAdmin;
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
          id="BuyerInfoTable"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">
                Product Name
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Buyer Name
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Number of Product
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Received Address
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedOrdersItemAdmin.ordersList.map((order, index) => {
              return (
                <tr
                  className={`buyer-info-line border-b ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  key={index}
                >
                  <td className="py-4 px-6">
                    {selectedOrdersItemAdmin.productName}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                  >
                    {order.username}
                  </td>
                  <td className="py-4 px-6">{order.purchaseNum}</td>
                  <td className="py-4 px-6">{order.address}</td>
                  <td className="py-4 px-6">{order.telephoneNum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
