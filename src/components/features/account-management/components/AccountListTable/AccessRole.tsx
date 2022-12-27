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
        onClick={() => handleSelect(id)}
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

  const handleSelect = (id: number) => {
    if (id === 1) return;
    if (!roleIds.includes(id)) {
      setRoleIds([...roleIds, id]);
    } else {
      setRoleIds(roleIds.filter((x) => x !== id));
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
        className="mx-[30%] relative z-10 justify-center"
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
            <Dialog.Title as="h1" className="leading-6 grid grid-cols-3">
              <div></div>
              <div className="text-[#A45FB7] flex text-[18px] content-center font-semibold my-[20%]">
                Access Configuration
              </div>
              <div className="justify-self-end" data-testid="cancel-icon">
                <CancelIcon handleClose={handleClose} />
              </div>
            </Dialog.Title>
            <div className="mt-2">
              <Banner
                visible={showBanner}
                success={updateSuccess}
                message={message as string}
              />
              <div className="col-span-2">
                <div className="text-xl text-gray-900 mb-8">
                  Please select role for the user {account.username}
                </div>
                <div className="flex justify-start gap-6 mt-3">
                  {allRoles.map((role) => renderRole(role, role.roleId))}
                </div>
              </div>

              <div className="flex justify-end mr-8">
                <button
                  onClick={() => handleSubmit()}
                  className="text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-2xl text-2xl w-44 h-12 px-5 py-2 text-center"
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
