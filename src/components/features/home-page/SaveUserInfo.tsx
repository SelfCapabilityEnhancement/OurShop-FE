import { UserOffice, UserInfo } from '@/components/common/CustomTypes';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { initUserInfo } from '@/constants';
import { getAllOffices, saveUserInfo } from '@/service';
import Banner from '@/components/common/banner/Banner';

const successMsg = 'Your information is saved!';
const failMsg = 'All required field must be filled!';

const basicInputClassName =
  'bg-inherit border text-gray-700 text-base w-full h-full py-2 px-4 text-left rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300';

const basicForm: {
  id: keyof UserInfo;
  label: string | undefined;
  type: string | undefined;
}[] = [
  { id: 'userRealName', label: 'Name', type: 'string | undefined' },
  { id: 'telephoneNum', label: 'Phone', type: 'number | undefined' },
];

const initCity = [{ id: 1, name: '' }];

export default function SaveUserInfo({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);
  const [showBanner, setShowBanner] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedCity, setSelectedCity] = useState(initCity[0]);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [border, setBorder] = useState(false);
  const [officeList, setOfficeList] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getAllOffices().then((data) => {
      setCities(
        data.map(({ id, office }) => ({
          id,
          name: office,
        }))
      );
      setOfficeList(
        data.map(({ id, office }) => ({
          id,
          name: office,
        }))
      );
    });
  }, []);

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
    }
    setUserInfo(tmp);
  };

  const handleListBoxField = (event: UserOffice) => {
    setSelectedCity(event);
    const tmp = { ...userInfo };
    tmp.officeId = Number(getOfficeId(event.name));
    setUserInfo(tmp);
    setCities(officeList);
    setBorder(false);
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
      userInfo.officeId === 0 ||
      userInfo.userRealName === undefined ||
      userInfo.telephoneNum === undefined ||
      userInfo.officeId === undefined
    ) {
      if (userInfo.userRealName === '') {
        userInfo.userRealName = undefined;
      }
      if (userInfo.telephoneNum === 0) {
        userInfo.telephoneNum = undefined;
      }
      if (userInfo.officeId === 0) {
        setBorder(true);
        userInfo.officeId = undefined;
      }
      setShowBanner(true);
      setSaveSuccess(false);
      setTimeout(() => {
        setShowBanner(false);
      }, 2000);
    } else {
      try {
        await saveUserInfo(userInfo);
        setShowBanner(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setShowBanner(false);
          setIsOpen(false);
        }, 2000);
      } catch (e) {
        setShowBanner(true);
        setSaveSuccess(false);
        setTimeout(() => {
          setShowBanner(false);
        }, 2000);
      }
    }
  };

  // @ts-ignore
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="absolute inset-0 top-[-50px]">
        <div className="container mx-auto flex items-center" id="nav">
          <div className="mt-[7rem] w-full p-4 pt-2">
            <div className="mx-auto md:w-1/3 md:p-6">
              <div className="mb-4 rounded bg-[#EEEEEE] px-8 pt-6 pb-8 shadow-md">
                <p className="text-center text-3xl font-normal text-purple-400">
                  Welcome
                </p>
                <p className="text-black-500 mt-6 h-14 text-center text-[16px]">
                  Please fill the required information before purchases
                </p>
                <Banner
                  visible={showBanner}
                  success={saveSuccess}
                  message={saveSuccess ? successMsg : failMsg}
                />
                <form>
                  {basicForm.map(({ id, label }) => (
                    <div key={id} className="mb-8">
                      <label
                        htmlFor={id}
                        className="mb-2 block text-sm text-gray-700"
                      >
                        {label}
                        <span className="text-red-500">&nbsp;*</span>
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          data-testid={id}
                          id={id}
                          className={
                            userInfo[id] === undefined
                              ? basicInputClassName + ' border-red-500'
                              : basicInputClassName + ' border-black'
                          }
                          onChange={(event) => handleInputField(event, id)}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mb-8">
                    <label className="mb-2 block text-sm text-gray-700">
                      Select at Office
                      <span className="text-red-500">&nbsp;*</span>
                    </label>
                    <Listbox
                      value={selectedCity}
                      onChange={(event) => handleListBoxField(event)}
                    >
                      <div className="relative mt-1 h-full w-full">
                        <Listbox.Button
                          data-testid="officeId"
                          className={
                            border
                              ? basicInputClassName + ' border-red-500'
                              : basicInputClassName + ' border-black'
                          }
                        >
                          <span className="block h-[22px] truncate">
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
                            {officeList?.map((city) => (
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
                  <div className="mb-4 ml-[55%]">
                    <button
                      data-testid="save-btn"
                      className="rounded-2xl rounded bg-violet-500 bg-[#7F62C3] py-2 px-16 text-lg font-medium font-bold text-white transition duration-500 duration-200 ease-in hover:bg-violet-700 focus:ring-violet-500 "
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
      </div>
    </Transition>
  );
}
