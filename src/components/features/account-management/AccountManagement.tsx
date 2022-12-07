import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import AccountListTable from '@/components/features/account-management/AccountListTable';
import { useEffect, useState } from 'react';
import { getAccountList } from '@/service';
import { Account } from '@/components/common/CustomTypes';

const tabs = [
  { id: 'account-list', name: 'Account List' },
  { id: 'role-configuration', name: 'Role Configuration' },
  { id: 'function-configuration', name: 'Function Configuration' },
];

export default function AccountManagement() {
  const [accountList, setAccountList] = useState<Account[]>([]);

  useEffect(() => {
    getAccountList().then((data) => {
      setAccountList(data);
    });
  }, []);

  return (
    <div className="w-full max-w-full p-3">
      <Tab.Group>
        <Tab.List className="flex gap-24 p-1 ml-16">
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
            <AccountListTable userList={accountList} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
