import { Feature } from '@/components/common/CustomTypes';

export const featureListTabs = [
  { id: 'function', name: 'Function' },
  { id: 'code', name: 'Code' },
  { id: 'description', name: 'Description' },
  { id: 'updated-at', name: 'Updated at' },
  { id: 'action', name: 'Action' },
];

export default function FeatureTable(props: { featureList: Feature[] }) {
  const featureList = props.featureList;

  return (
    <div className="overflow-x-auto relative sm:rounded-lg mt-6">
      <table className="w-full text-center" id="AccountListTable">
        <thead className="text-gray-800 bg-gray-100 text-lg">
          <tr className="h-16">
            {featureListTabs.map((item) => (
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
          {featureList.map((feature, index) => (
            <tr className="h-16 border-b border-gray-400" key={index}>
              <td
                className="px-2"
                title={
                  feature.featureName.length > 20 ? feature.featureName : ''
                }
              >
                {feature.featureName.length > 20
                  ? feature.featureName.substring(0, 19) + '...'
                  : feature.featureName}
              </td>
              <td className="px-2">{feature.code}</td>
              <td
                className="px-2"
                title={
                  feature.description.length > 20 ? feature.description : ''
                }
              >
                {feature.description.length > 20
                  ? feature.description.substring(0, 19) + '...'
                  : feature.description}
              </td>
              <td className="px-2">{feature.updateTime}</td>
              <td className="px-2 text-blue-600">
                <button>Edit</button>
                {/* <span className="mr-6">Access</span> */}
                {/* <span>Delete</span> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
