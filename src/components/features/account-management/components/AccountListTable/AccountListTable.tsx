import { Account } from '@/components/common/CustomTypes';
import { useEffect, useState } from 'react';
import { getAccountList } from '@/service';
import AccessRole from '@/components/features/account-management/components/AccountListTable/AccessRole';

const accountListTabs = [
  { id: 'user-name', name: 'Username' },
  { id: 'connection', name: 'Connection' },
  { id: 'role', name: 'Role' },
  { id: 'created-at', name: 'Created at' },
  { id: 'action', name: 'Action' },
];

export default function AccountListTable() {
  const [userList, setUserList] = useState<Account[]>([]);

  useEffect(() => {
    getAccountList().then((data) => {
      setUserList(data);
    });
  }, []);

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
      <div className="flex justify-center">
        <AccessRole isOpen={false} />
      </div>
      <table className="w-full text-center" id="AccountListTable">
        <thead className="text-gray-800 bg-gray-100 text-lg">
          <tr className="h-16">
            {accountListTabs.map((item) => (
              <th
                scope="col"
                className="font-normal"
                key={item.id}
                data-testid="account-table-head"
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr className="h-16 border-b border-gray-400" key={index}>
              <td
                className="px-2"
                title={user.username.length > 20 ? user.username : ''}
              >
                {user.username.length > 20
                  ? user.username.substring(0, 19) + '...'
                  : user.username}
              </td>
              <td className="px-2">{user.connection}</td>
              <td
                className="px-2"
                title={
                  user.roleNames.join(',').length > 30
                    ? user.roleNames.join(', ')
                    : ''
                }
              >
                {user.roleNames.join(', ')}
              </td>
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
