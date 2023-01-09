import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CancelIcon from '@/components/common/cancel-icon/Cancel-icon';
import { Account, Role } from '@/components/common/CustomTypes';
import { initAccount } from '@/constants';
import { getRoleList, updateRoleNames } from '@/service';
import Banner from '@/components/common/banner/Banner';

const basicRoleName =
  'w-40 h-9 text-center text-sm text-white font-normal py-2 rounded-lg mb-80';

export default function AccessRole({
  isOpen,
  handleClose,
  oldAccount,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldAccount: Account;
}) {
  const [showBanner, setShowBanner] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [message, setMessage] = useState<string>();
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [roleIds, setRoleIds] = useState<number[]>([1]);
  const [account, setAccount] = useState<Account>(initAccount);

  useEffect(() => {
    getRoleList(false).then((data) => {
      setAllRoles(data);
    });
    setAccount(oldAccount);
    setRoleIds(oldAccount.roles.map((role) => role.roleId));
  }, [oldAccount, isOpen]);

  const renderRole = (role: Role, id: number) => {
    return (
      <button
        key={role.roleId}
        onClick={() => handleSelect(role)}
        className={
          roleIds.includes(id)
            ? basicRoleName + ' bg-[#AE66C3]'
            : basicRoleName + ' bg-gray-300'
        }
      >
        {role.roleName}
      </button>
    );
  };

  const handleSelect = (role: Role) => {
    if (role.roleName === 'Buyer') return;
    if (!roleIds.includes(role.roleId)) {
      setRoleIds([...roleIds, role.roleId]);
    } else {
      setRoleIds(roleIds.filter((x) => x !== role.roleId));
    }
  };

  const handleSubmit = async () => {
    try {
      await updateRoleNames(account.userId, roleIds);
      setUpdateSuccess(true);
      setMessage('The Change was made Successfully!');
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
        window.location.reload();
      }, 3000);
    } catch (e) {
      setAccount(oldAccount);
      setUpdateSuccess(false);
      setMessage('Wrong!');
      setShowBanner(false);
      setTimeout(() => {
        setShowBanner(false);
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 mx-[30%] justify-center"
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed top-[19%] w-[590px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle transition-all">
            <Dialog.Title as="h1" className="grid grid-cols-3 leading-6">
              <div></div>
              <div className="col-start-1 col-end-4 flex">
                <div className="ml-[30%] mb-[5%] content-center text-xl font-semibold text-[#A45FB7]">
                  Access Configuration
                </div>
                <div className="w-[28%]"></div>
                <div className="justify-self-end" data-testid="cancel-icon">
                  <CancelIcon handleClose={handleClose} />
                </div>
              </div>
            </Dialog.Title>
            <div className="mt-2">
              <Banner
                visible={showBanner}
                success={updateSuccess}
                message={message as string}
              />
              <div className="col-span-2">
                <div className="mb-8 text-xl text-gray-900">
                  Please select role for the user {account.username}
                </div>
                <div className="mt-3 flex justify-start gap-6">
                  {allRoles.map((role) => renderRole(role, role.roleId))}
                </div>
              </div>

              <div className="mr-8 flex justify-end">
                <button
                  data-testid="saveBtn"
                  onClick={() => handleSubmit()}
                  className="h-12 w-44 rounded-2xl bg-violet-500 px-5 py-2 text-center text-2xl font-medium text-white transition duration-200 ease-in hover:bg-violet-700 focus:ring-violet-500"
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
