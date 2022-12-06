const accountListTabs = [
  { id: 'user-name', name: 'UserName' },
  { id: 'connection', name: 'Connection' },
  { id: 'role', name: 'Role' },
  { id: 'created-at', name: 'Created at' },
  { id: 'action', name: 'Action' },
];

export default function AccountListTable(props: {}) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-6">
      <table className="w-full dark:text-gray-400" id="AccountListTable">
        <thead className="text-gray-800 bg-gray-100 text-center text-lg">
          <tr className="h-14">
            {accountListTabs.map((item) => (
              <th scope="col" className="py-3 px-6 text-center" key={item.id}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
