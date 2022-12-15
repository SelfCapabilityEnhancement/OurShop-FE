import { UserInfo } from '@/components/common/CustomTypes';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { initUserInfo } from '@/constants';
import { saveUserInfo } from '@/service';
import Banner from '@/components/common/banner/Banner';

const successMsg = 'Your information is saved!';
const failMsg = 'All required field must be filled!';

const inputClassName =
  'bg-inherit border border-black text-gray-700 text-base w-full py-2 px-4 text-left rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300';
const inputErrorClassName =
  'bg-inherit border border-red-500 text-gray-700 text-base w-full py-2 px-4 text-left rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300';

const basicForm: {
  id: keyof UserInfo;
  label: string | undefined;
  type: string | undefined;
}[] = [
  { id: 'userRealName', label: 'Name', type: 'string | undefined' },
  { id: 'telephoneNum', label: 'Phone', type: 'number | undefined' },
];
const baseCites = [
  { id: 1, name: 'Beijing' },
  { id: 2, name: 'Chengdu' },
  { id: 3, name: 'Shanghai' },
  { id: 4, name: 'Shenzhen' },
  { id: 5, name: 'Wuhan' },
  { id: 6, name: `Xi'an` },
];
export default function SaveUserInfo({ isOpen }: { isOpen: boolean }) {
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedCity, setSelectedCity] = useState(baseCites[0]);
  const [cities, setCities] = useState(baseCites);

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = event.target.value;
    const tmp = { ...userInfo };
    switch (field) {
      case 'userRealName':
        tmp.userRealName = value;
        break;
      case 'telephoneNum':
        tmp.telephoneNum = Number(value);
        break;
      case 'officeId':
        tmp.officeId = Number(value);
        break;
    }
    setUserInfo(tmp);
  };

  const handleListBoxField = (
    event: React.ExoticComponent<{
      children?: React.ReactNode;
    }>
  ) => {
    // @ts-ignore
    setSelectedCity(event);
    const tmp = { ...userInfo };
    tmp.officeId = Number(getOfficeId(event.name));
    setUserInfo(tmp);
    setCities(baseCites);
  };

  const getOfficeId = (currentName: string): number => {
    const result = cities.filter((city) => city.name === currentName);
    return result[0].id;
  };
  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (
      userInfo.userRealName === '' ||
      userInfo.telephoneNum === 0 ||
      userInfo.officeId === 0
    ) {
      if (userInfo.userRealName === '') {
        userInfo.userRealName = undefined;
      }
      if (userInfo.telephoneNum === 0) {
        userInfo.telephoneNum = undefined;
      }
      if (userInfo.officeId === 0) {
        userInfo.officeId = undefined;
      }
      setShowBanner(true);
      setMessage(failMsg);
      setSaveSuccess(false);
      setTimeout(() => {
        setShowBanner(false);
      }, 2000);
    } else {
      await saveUserInfo(userInfo);
      setShowBanner(true);
      setMessage(successMsg);
      setSaveSuccess(true);
      setTimeout(() => {
        setShowBanner(false);
        window.location.reload();
      }, 2000);
    }
  };

  // @ts-ignore
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="mx-auto container flex items-center" id="nav">
        <div className="w-full pt-2 p-4">
          <div className="mx-auto md:p-6 md:w-1/3">
            <div className="bg-[#EEEEEE] shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p className="mt-6 text-center text-3xl text-purple-400 font-normal">
                Welcome
              </p>
              <p className="mt-6 h-14 text-center text-lg text-black-500">
                Please fill some information before purchases
              </p>
              <Banner
                visible={showBanner}
                success={saveSuccess}
                message={message}
              />
              <form>
                {basicForm.map(({ id, label }) => (
                  <div key={id} className="mb-8">
                    <label
                      htmlFor={id}
                      className="block text-gray-700 text-sm mb-2"
                    >
                      {label}
                      <span className="text-red-500">&nbsp;*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id={id}
                        className={
                          userInfo[id] === undefined
                            ? inputErrorClassName
                            : inputClassName
                        }
                        onChange={(event) => handleInputField(event, id)}
                      />
                    </div>
                  </div>
                ))}
                <div className="mb-8">
                  <label className="block text-gray-700 text-sm mb-2">
                    Select at Office
                    <span className="text-red-500">&nbsp;*</span>
                  </label>
                  {/* @ts-ignore */}
                  <Listbox
                    value={selectedCity}
                    onChange={(event) => handleListBoxField(event)}
                  >
                    <div className="relative mt-1 w-full">
                      <Listbox.Button className="relative w-full bg-inherit border border-black text-gray-700 text-base w-full py-2 px-4 text-left rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300">
                        <span className="block truncate">
                          {selectedCity.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg
                            className="h-10 w-10"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              className="png"
                              fill={'rgb(217 217 217)'}
                              d="M18 15l-6-6l-6 6h12"
                              transform="rotate(180 12 12)"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#EEEEEE] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {baseCites.map((city) => (
                            <Listbox.Option
                              key={city.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                  active ? 'bg-slate-100' : 'text-gray-900'
                                }`
                              }
                              value={city}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {city.name}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div className="mb-4 ml-[60%]">
                  <button
                    className="transition duration-500 bg-violet-500 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 ease-in duration-200 font-medium rounded-2xl text-lg font-bold py-2 px-14 rounded "
                    onClick={(event) => handleSave(event)}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
