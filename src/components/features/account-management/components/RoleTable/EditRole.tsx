import { Feature, Role } from '@/components/common/CustomTypes';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Banner from '@/components/common/banner/Banner';
import { classNames } from '@/utils';
import { getFeatureList, updateRole } from '@/service';
import { initRole } from '@/constants';

export default function EditRole({
  isOpen,
  handleClose,
  oldRole,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldRole: Role;
}) {
  const [showBanner, setShowBanner] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [message, setMessage] = useState<string>();
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [featureIds, setFeatureIds] = useState<number[]>([]);
  const [role, setRole] = useState<Role>(initRole);

  useEffect(() => {
    getFeatureList().then((data) => {
      setAllFeatures(data);
    });
    setRole(oldRole);
    setFeatureIds(oldRole.featureList.map((feature) => feature.featureId));
  }, [oldRole, isOpen]);

  const renderFeature = (feature: string, id: number) => {
    return (
      <span
        key={feature}
        onClick={() => handleSelect(id)}
        className={classNames(
          ' text-center text-sm font-normal mx-[3%] w-[300px] h-[100px]',
          featureIds.includes(id) ? 'bg-purple-300' : 'bg-gray-300'
        )}
      >
        {feature}
      </span>
    );
  };

  const handleSelect = (id: number) => {
    if (!featureIds.includes(id)) {
      setFeatureIds([...featureIds, id]);
    } else {
      setFeatureIds(featureIds.filter((x) => x !== id));
    }
  };

  const handleSubmit = async () => {
    try {
      await updateRole(role.roleId, featureIds);
      setUpdateSuccess(true);
      setShowBanner(true);
      setMessage('The Change was made Successfully!');
      setTimeout(() => {
        setShowBanner(false);
        window.location.reload();
      }, 3000);
    } catch (e) {
      setRole(oldRole);
      setUpdateSuccess(false);
      setShowBanner(false);
      setMessage('Wrong!');
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
          <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h1"
              className="text-lg font-medium leading-6 text-gray-900 grid grid-cols-3"
            >
              <div></div>
              <div className="text-[#A45FB7] content-center justify-self-center font-semibold">
                Role Configuration
              </div>
              <div className="justify-self-end" data-testid="cancel-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => handleClose()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </Dialog.Title>
            <div className="mt-2">
              <Banner
                visible={showBanner}
                success={updateSuccess}
                message={message as string}
              />
              <div className="mb-6 text-xl font-normal">
                <div className="col-span-8">
                  <span className="text-red-500 pr-1">*</span>
                  Please select function for <b>{role.roleName}</b>
                </div>
                <div className="">
                  <div className="">
                    {allFeatures.map((feature) =>
                      renderFeature(feature.featureName, feature.featureId)
                    )}
                  </div>
                </div>
                <div></div>
                <button
                  onClick={() => handleSubmit()}
                  className="mt-[30%] mx-[50%] token w-2/5 p-2 h-14 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 text-white transition ease-in disabled:opacity-50"
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
