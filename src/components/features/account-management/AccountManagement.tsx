import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import AccountListTable from '@/components/features/account-management/AccountListTable';

const tabs = [
  { id: 'account-list', name: 'Account List' },
  { id: 'role-configuration', name: 'Role Configuration' },
  { id: 'function-configuration', name: 'Function Configuration' },
];

export default function AccountManagement() {
  return (
    <div className="w-full max-w-full p-3">
      <Tab.Group>
        <Tab.List className="flex space-x-12 p-1 ml-8">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  'rounded-lg text-xl font-semibold outline-0 mt-4',
                  selected
                    ? `${tab.id} text-pink-500 underline underline-offset-8 border-b-2 border-white`
                    : 'text-gray-800'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AccountListTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
