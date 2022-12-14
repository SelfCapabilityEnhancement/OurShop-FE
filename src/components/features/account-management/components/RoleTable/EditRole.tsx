import { Role } from '@/components/common/CustomTypes';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Banner from '@/components/common/banner/Banner';
import { classNames } from '@/utils';
import { updateRole } from '@/service';

const featureList = [
  'Product Management',
  'Order Management',
  'Create Product',
  'Account Management',
];

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
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState<string>();
  const [featureIds, setFeatureIds] = useState<number[]>(
    oldRole.featureList.map((feature) => feature.featureId)
  );

  const renderFeature = (feature: string, index: number) => {
    return (
      <div
        key={feature}
        onClick={() => handleSelect(index + 1)}
        className={classNames(
          'text-center text-sm font-normal py-0.5',
          // ' col-start-2 text-white hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center',
          featureIds.includes(index + 1) ? 'bg-purple-300' : 'bg-gray-300'
        )}
      >
        {feature}
      </div>
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
    setResult(await updateRole(oldRole.roleId, featureIds));
    if (result) {
      setShowBanner(true);
      setMessage('The Change was made Successfully!');
      setTimeout(() => setShowBanner(false), 3000);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 justify-center"
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
              {/* TODO color:purple */}
              <div className=" content-center justify-self-center font-semibold">
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
                success={result}
                message={message as string}
              />
              <div className="mb-6 grid grid-cols-2 gap-y-3 text-xl font-normal">
                {/* TODO 获取到的feature的Name */}
                {/* <section className="col-span-2 grid grid-cols-2 gap-y-4"> */}
                <div className="col-span-8">
                  <span className="text-red-500 pr-1">*</span>
                  Please select function for <b>{oldRole.roleName}</b>
                </div>
                <div className="grid grid-cols-3 mt-3 w-1/2">
                  {featureList.map((feature, index) =>
                    renderFeature(feature, index)
                  )}
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="update col-start-2 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
