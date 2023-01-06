import { Feature, Role } from '@/components/common/CustomTypes';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Banner from '@/components/common/banner/Banner';
import { clsx as classNames } from 'clsx';
import { getFeatureList, updateRole } from '@/service';
import { initRole } from '@/constants';
import CancelIcon from '@/components/common/cancel-icon/Cancel-icon';

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
      <button
        key={feature}
        onClick={() => handleSelect(id)}
        className={classNames(
          'text-l mt-[3%] mr-[3%] h-[30px] w-[160px] rounded-lg text-center text-[15px] font-normal text-white',
          featureIds.includes(id) ? 'bg-[#AE66C3]' : 'bg-gray-300'
        )}
      >
        {feature}
      </button>
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
      setMessage('The Change was made Successfully!');
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
        window.location.reload();
      }, 3000);
    } catch (e) {
      setRole(oldRole);
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
          <Dialog.Panel className="absolute top-[-285px] w-[600px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h1"
              className="grid grid-cols-3 text-lg font-medium leading-6 text-gray-900"
            >
              <div></div>
              <div className="mb-[20%] content-center justify-self-center text-xl font-semibold text-[#A45FB7]">
                Role Configuration
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
              <div className="mb-6 text-xl font-normal ">
                <div className="col-span-8">
                  Please select function for <b>{role.roleName}</b>
                </div>
                <div className="">
                  <div className="flex flex-wrap">
                    {allFeatures.map((feature) =>
                      renderFeature(feature.featureName, feature.featureId)
                    )}
                  </div>
                </div>
                <div></div>
                <button
                  data-testid="saveBtn"
                  onClick={() => handleSubmit()}
                  className="token mx-[50%] mt-[30%] h-14 w-2/5 rounded-lg bg-violet-500 p-2 text-lg font-semibold text-white text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 disabled:opacity-50"
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
