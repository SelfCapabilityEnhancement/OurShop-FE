import { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import AccountListTable from '@/components/features/account-management/AccountListTable';
import FeatureTable from '@/components/features/account-management/components/FeatureTable/FeatureTable';
import RoleTable from '@/components/features/account-management/components/RoleTable/RoleTable';
import { Account, Feature, Role } from '@/components/common/CustomTypes';
import { getAccountList, getFeatureList, getRoleList } from '@/service';

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
    getRoleList().then((data) => {
      setRoleList(data);
    });
    getFeatureList().then((data) => {
      setFeatureList(data);
    });
  }, []);

  return (
    <div className="w-full max-w-full p-3">
      <Tab.Group>
        <Tab.List className="flex gap-24 p-1 ml-16">
          {tabs.map((tab) => {
            return (
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
