import { Account } from '@/components/common/CustomTypes';

const accountListTabs = [
  { id: 'user-name', name: 'Username' },
  { id: 'connection', name: 'Connection' },
  { id: 'role', name: 'Role' },
  { id: 'created-at', name: 'Created at' },
  { id: 'action', name: 'Action' },
];

export default function AccountListTable(props: { userList: Account[] }) {
  const userList = props.userList;

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
      <table className="w-full text-center" id="AccountListTable">
        <thead className="text-gray-800 bg-gray-100 text-lg">
          <tr className="h-16">
            {accountListTabs.map((item) => (
              <th
                scope="col"
                className="font-normal"
                key={item.id}
                data-testid="account-tab-title"
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr className="h-16 border-b border-gray-400" key={index}>
              <td className="px-2">{user.username}</td>
              <td className="px-2">{user.connection}</td>
              <td className="px-2">{user.role}</td>
              <td className="px-2">{user.createdTime}</td>
              <td className="px-2 text-blue-600">
                <span className="mr-6">Access</span>
                <span>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
