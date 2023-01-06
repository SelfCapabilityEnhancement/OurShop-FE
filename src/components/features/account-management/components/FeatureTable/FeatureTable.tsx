import { Feature } from '@/components/common/CustomTypes';
import EditFeature from '@/components/features/account-management/components/FeatureTable/EditFeature';
import { useState } from 'react';

export const featureListTabs = [
  { id: 'function', name: 'Function' },
  { id: 'code', name: 'Code' },
  { id: 'description', name: 'Description' },
  { id: 'updated-at', name: 'Updated at' },
  { id: 'action', name: 'Action' },
];

export default function FeatureTable(props: { featureList: Feature[] }) {
  const featureList = props.featureList;
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [chosen, setChosen] = useState(0);

  const handleEdit = (index: number) => {
    setChosen(index);
    setShowFeatureModal(true);
  };

  const handleCancelEdit = () => {
    setShowFeatureModal(false);
  };

  return (
    <div className="relative mt-6 overflow-y-auto sm:rounded-lg">
      <div className="absolute w-full max-w-full p-3">
        {featureList.length > 0 && (
          <EditFeature
            isOpen={showFeatureModal}
            handleClose={handleCancelEdit}
            oldFeature={featureList[chosen]}
          />
        )}
      </div>
      <table className="w-full text-center" id="AccountListTable">
        <thead className="bg-gray-100 text-lg text-gray-800">
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
            <tr
              className="h-16 border-b border-gray-400"
              key={feature.featureId}
            >
              <td className="px-2">{feature.featureName}</td>
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
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
