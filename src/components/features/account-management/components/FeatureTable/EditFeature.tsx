import { Feature } from '@/components/common/CustomTypes';
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Banner from '@/components/common/banner/Banner';
import { updateFeature } from '@/service';
import { initFeature } from '@/constants';

const inputClassName =
  'w-[550px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring focus:ring-purple-300';
const inputErrorClassName =
  'w-[550px] shadow-sm bg-gray-50 border border-red-500 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring focus:ring-purple-300';
export default function EditFeature({
  isOpen,
  handleClose,
  oldFeature,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldFeature: Feature;
}) {
  const [feature, setFeature] = useState<Feature>(initFeature);
  const [showBanner, setShowBanner] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [message, setMessage] = useState<string>();
  const [inputError, setInputError] = useState(true);

  useEffect(() => {
    setFeature(oldFeature);
  }, [oldFeature, isOpen]);

  const changeInputErrorStatus = (code: string) => {
    setFeature({ ...feature, code });
    setInputError(true);
  };

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    field === 'code'
      ? changeInputErrorStatus(event.target.value)
      : setFeature({ ...feature, description: event.target.value });
  };

  const handleSubmit = async () => {
    if (feature.code === '') {
      setShowBanner(true);
      setUpdateSuccess(false);
      setInputError(false);
      setMessage('The code is required field!');
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    } else {
      try {
        await updateFeature(
          feature.featureId,
          feature.code,
          feature.description
        );
        setUpdateSuccess(true);
        setInputError(true);
        setMessage('The Change was made Successfully!');
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
          window.location.reload();
        }, 3000);
      } catch (e) {
        setFeature(oldFeature);
        setUpdateSuccess(false);
        setInputError(false);
        setMessage('The code is wrong!');
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="mx-[31%] relative z-10 justify-center"
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
            <Dialog.Title as="h1" className="flex">
              <div className="ml-[25%] mr-[25%] mb-[5%] text-[#A45FB7] text-2xl content-center justify-self-center font-semibold">
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
                success={updateSuccess}
                message={message as string}
              />
              <div className="mb-6 grid grid-cols-2 gap-y-3 text-xl font-normal">
                <div className="col-span-8">
                  <span className="text-red-500 pr-1">*</span>
                  Please fill the code for <b>{feature.featureName}</b>
                </div>
                <input
                  data-testid="code"
                  type={'string'}
                  className={inputError ? inputClassName : inputErrorClassName}
                  onChange={(event) => handleInputField(event, 'code')}
                  value={feature.code as string}
                />
                <section className="col-span-8">Function Description</section>
                <textarea
                  className={
                    'col-span-2 h-28 shadow-sm resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring focus:ring-purple-300'
                  }
                  value={feature.description}
                  onChange={(event) => handleInputField(event, 'description')}
                />
                <button
                  data-testid="saveBtn"
                  onClick={() => handleSubmit()}
                  className="mx-[5%] mt-[30%] update col-start-2 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
