import { Role } from '@/components/common/CustomTypes';

export const roleListTabs = [
  { id: 'role', name: 'Role' },
  { id: 'functions', name: 'Functions' },
  { id: 'updated-at', name: 'Updated at' },
  { id: 'action', name: 'Action' },
];

export default function RoleTable(props: { roleList: Role[] }) {
  const roleList = props.roleList;

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
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
          {roleList.map((role) => (
            <tr className="h-16 border-b border-gray-400" key={role.roleId}>
              <td className="px-2">{role.roleName}</td>
              <td className="px-2">
                {role.featureList.map((feature) => (
                  <span key={feature.featureId}>{feature.featureName}</span>
                ))}
              </td>
              <td className="px-2">{role.updateTime}</td>
              <td className="px-2 text-blue-600">
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
