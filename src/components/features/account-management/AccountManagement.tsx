import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { clsx as classNames } from 'clsx';
import FeatureTable from '@/components/features/account-management/components/FeatureTable/FeatureTable';
import RoleTable from '@/components/features/account-management/components/RoleTable/RoleTable';
import { Account, Feature, Role } from '@/components/common/CustomTypes';
import { getAccountList, getFeatureList, getRoleList } from '@/service';
import AccountListTable from '@/components/features/account-management/components/AccountListTable/AccountListTable';

const tabs = [
  { id: 'account-list', name: 'Account List' },
  { id: 'role-configuration', name: 'Role Configuration' },
  { id: 'function-configuration', name: 'Function Configuration' },
];

export default function AccountManagement() {
  const [userList, setUserList] = useState<Account[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);
  const [featureList, setFeatureList] = useState<Feature[]>([]);

  useEffect(() => {
    getAccountList().then((data) => {
      setUserList(data);
    });
    getRoleList(false).then((data) => {
      setRoleList(data);
    });
    getFeatureList().then((data) => {
      setFeatureList(data);
    });
  }, []);

  return (
    <div className="w-full max-w-full p-3">
      <Tab.Group>
        <Tab.List className="ml-16 flex gap-24 p-1">
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  classNames(
                    'mt-4 rounded-lg text-xl font-semibold outline-0',
                    selected
                      ? `${tab.id} border-b-2 border-white text-pink-500 underline underline-offset-8`
                      : 'text-gray-800'
                  )
                }
              >
                {tab.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AccountListTable userList={userList} />
          </Tab.Panel>
          <Tab.Panel>
            <RoleTable roleList={roleList} />
          </Tab.Panel>
          <Tab.Panel>
            <FeatureTable featureList={featureList} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
