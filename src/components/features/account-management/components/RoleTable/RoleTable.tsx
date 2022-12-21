import { Role } from '@/components/common/CustomTypes';
import { useEffect, useState } from 'react';
import { getRoleList } from '@/service';
import EditRole from '@/components/features/account-management/components/RoleTable/EditRole';

export const roleListTabs = [
  { id: 'role', name: 'Role' },
  { id: 'functions', name: 'Functions' },
  { id: 'updated-at', name: 'Updated at' },
  { id: 'action', name: 'Action' },
];

export default function RoleTable() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleList, setRoleList] = useState<Role[]>([]);
  const [chosen, setChosen] = useState(0);

  useEffect(() => {
    getRoleList().then((data) => {
      setRoleList(data);
    });
  }, []);

  const handleEdit = (index: number) => {
    setChosen(index);
    setShowRoleModal(true);
  };

  const handleCancelEdit = () => {
    setShowRoleModal(false);
  };

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
      <div className="absolute w-full max-w-full p-3">
        {roleList.length > 0 && (
          <EditRole
            isOpen={showRoleModal}
            handleClose={handleCancelEdit}
            oldRole={roleList[chosen]}
          />
        )}
      </div>
      <table className="w-full text-center" id="AccountListTable">
        <thead className="text-gray-800 bg-gray-100 text-lg">
          <tr className="h-16">
            {roleListTabs.map((item) => (
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
          {roleList.map((role, index) => (
            <tr className="h-16 border-b border-gray-400" key={role.roleId}>
              <td className="px-2">{role.roleName}</td>
              <td className="px-2 w-[400px]">
                {role.featureNameList.join(', ')}
              </td>
              <td className="px-2">{role.updateTime}</td>
              <td className="px-2 text-blue-600">
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
