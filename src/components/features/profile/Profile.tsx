import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import avatarUrl from 'images/avatar.png';
import { classNames } from '@/components/common/utils';


export default function Profile() {
  return (
    <Menu as="div" className="relative basis-1/4 flex justify-end mr-8">
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white py-1 shadow-lg divide-y divide-gray-200 ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="my-wallet"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'wallet block px-4 py-2 text-center text-base'
                  )}
                >
                  my wallet
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="my-order"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'settings block px-4 py-2 text-center text-base'
                  )}
                >
                  settings
                </NavLink>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
