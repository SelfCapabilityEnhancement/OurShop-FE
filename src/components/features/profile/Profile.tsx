import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import avatarUrl from 'images/avatar.png';
import { clsx as classNames } from 'clsx';
import { useLoginStore } from '@/hooks/useLoginStore';

export default function Profile() {
  const handleLogout = () => {
    useLoginStore.getState().clear();
  };
  return (
    <Menu as="div" className="relative mx-8 flex justify-end">
      <Menu.Button>
        <img className="avatar h-12 w-12 rounded-full" src={avatarUrl} alt="" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-14 w-40 divide-y divide-gray-200 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="my-wallet"
                  className={classNames(
                    { 'bg-gray-100': active },
                    'wallet block px-4 py-2 text-center text-base'
                  )}
                >
                  My Wallet
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="my-information"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'address block px-4 py-2 text-center text-base'
                  )}
                >
                  My Information
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <span
                className={'settings block px-4 py-2 text-center text-base'}
              >
                Settings
              </span>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="login"
                  className={classNames(
                    { 'bg-gray-100': active },
                    'address block px-4 py-2 text-center text-base'
                  )}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
