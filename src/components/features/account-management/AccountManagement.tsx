import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const tabs = [
  { id: 'account-list', name: 'Account List' },
  { id: 'role-configuration', name: 'Role Configuration' },
  { id: 'function-configuration', name: 'Function Configuration' },
];

export default function AccountManagement() {
  localStorage.setItem('selected', 'account-list');
  const [selected, setSelected] = useState<string>('account-list');
  useEffect(() => {
    setSelected(localStorage.getItem('selected') as string);
  }, []);

  const changePage = (id: string) => {
    setSelected(id);
    localStorage.setItem('selected', id);
  };

  return (
    <div className="w-full max-w-full p-3">
      {tabs.map((tab) => {
        return (
          <Link to={tab.id} key={tab.id}>
            <span
              key={tab.id}
              onClick={() => {
                changePage(tab.id);
              }}
              className={
                selected === tab.id
                  ? `${tab.id} text-pink-500 underline underline-offset-8 border-b-2 border-white w-52 rounded-lg text-xl font-semibold outline-0 mt-4 deleted mx-[3%] mb-[3%]`
                  : 'text-gray-800 w-52 rounded-lg text-xl font-semibold outline-0 mt-4 deleted mx-[3%] mb-[3%]'
              }
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
      <Outlet />
      {/* <Tab.Group> */}
      {/*   <Tab.List className="flex gap-24 p-1 ml-16"> */}
      {/*      */}
      {/*   </Tab.List> */}
      {/*   <Tab.Panels> */}
      {/*     <Tab.Panel> */}
      {/*       <AccountListTable userList={accountList} /> */}
      {/*     </Tab.Panel> */}
      {/*     <Tab.Panel> */}
      {/*       <RoleTable /> */}
      {/*     </Tab.Panel> */}
      {/*     <Tab.Panel> */}
      {/*       <FeatureTable /> */}
      {/*     </Tab.Panel> */}
      {/*   </Tab.Panels> */}
      {/* </Tab.Group> */}
    </div>
  );
}
