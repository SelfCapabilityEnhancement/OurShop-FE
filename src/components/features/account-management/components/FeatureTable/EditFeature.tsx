import { Feature } from '@/components/common/CustomTypes';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Banner from '@/components/common/banner/Banner';
import { classNames } from '@/utils';
import { updateFeature } from '@/service';

export default function EditFeature({
  isOpen,
  handleClose,
  oldFeature,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldFeature: Feature;
}) {
  const [feature, setFeature] = useState<Feature>(oldFeature);
  const [showBanner, setShowBanner] = useState(false);
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState<string>();

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    field === 'code'
      ? setFeature({ ...feature, code: event.target.value })
      : setFeature({ ...feature, description: event.target.value });
  };

  const handleSubmit = async () => {
    if (feature.code === '') {
      setShowBanner(true);
      setMessage('the code is required field!');
      setTimeout(() => setShowBanner(false), 3000);
    } else {
      setResult(
        await updateFeature(
          feature.featureId,
          feature.code,
          feature.description
        )
      );
      if (result) {
        setShowBanner(true);
        setMessage('The Change was made Successfully!');
        setTimeout(() => setShowBanner(false), 3000);
      } else {
        setFeature(oldFeature);
        setShowBanner(true);
        setMessage('All Required Field Must be Filled');
        setTimeout(() => setShowBanner(false), 3000);
      }
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
              <div className=" content-center justify-self-center font-semibold">
                Function Configuration
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
              <form className="mb-6 grid grid-cols-2 gap-y-3 text-xl font-normal">
                {/* TODO 获取到的feature的Name */}
                {/* <section className="col-span-2 grid grid-cols-2 gap-y-4"> */}
                <div className="col-span-8">
                  <span className="text-red-500 pr-1">*</span>
                  Please fill the code for <b>{feature.featureName}</b>
                </div>
                <input
                  type={'string'}
                  className={classNames(
                    'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 ' +
                      'text-base p-2 text-center rounded focus:outline-none focus:ring focus:ring-purple-300' +
                      'className="col-span-8'
                  )}
                  onChange={(event) => handleInputField(event, 'code')}
                  placeholder={feature.code as string}
                />
                <section className="col-span-8">Function Description</section>
                <textarea
                  className={classNames(
                    'col-span-2 h-28 shadow-sm resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring focus:ring-purple-300'
                  )}
                  placeholder={feature.description}
                  onChange={(event) => handleInputField(event, 'description')}
                />
                <button
                  onClick={() => handleSubmit()}
                  className="update col-start-2 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
