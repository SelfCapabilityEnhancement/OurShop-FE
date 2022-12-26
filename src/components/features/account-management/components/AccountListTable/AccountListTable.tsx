import { Account } from '@/components/common/CustomTypes';
import { useState } from 'react';
import AccessRole from '@/components/features/account-management/components/AccountListTable/AccessRole';

const accountListTabs = [
  { id: 'user-name', name: 'Username' },
  { id: 'connection', name: 'Connection' },
  { id: 'role', name: 'Role' },
  { id: 'created-at', name: 'Created at' },
  { id: 'action', name: 'Action' },
];

export default function AccountListTable(props: { userList: Account[] }) {
  const userList = props.userList;
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [chosen, setChosen] = useState(0);

  const handleAccess = (index: number) => {
    setChosen(index);
    setShowRoleModal(true);
  };

  const handleCancel = () => {
    setShowRoleModal(false);
  };

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
      <div className="flex justify-center">
        <AccessRole
          isOpen={showRoleModal}
          handleClose={handleCancel}
          oldAccount={userList[chosen]}
        />
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
                <button onClick={() => handleAccess(index)} className="mr-6">
                  Access
                </button>
                <span>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
