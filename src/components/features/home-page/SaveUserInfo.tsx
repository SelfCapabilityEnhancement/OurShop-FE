import { UserInfo } from '@/components/common/CustomTypes';
import { Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { initUserInfo } from '@/constants';
import { saveUserInfo } from '@/service';
import Banner from '@/components/common/banner/Banner';

const successMsg = 'Your information is saved!';
const failMsg = 'All required field must be filled!';

const inputClassName =
  'bg-inherit border border-black text-gray-700 text-base w-full py-2 px-4 text-center rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300';
const inputErrorClassName =
  'bg-inherit border border-red-500 text-gray-700 text-base w-full py-2 px-4 text-center rounded leading-tight focus:border-none focus:outline-none focus:ring focus:ring-purple-300';

const basicForm: {
  id: keyof UserInfo;
  label: string | undefined;
  type: string | undefined;
}[] = [
  { id: 'userRealName', label: 'Name', type: 'string | undefined' },
  { id: 'telephoneNum', label: 'Phone', type: 'number | undefined' },
  { id: 'officeId', label: 'Select an Office', type: 'number | undefined' },
];

export default function SaveUserInfo({ isOpen }: { isOpen: boolean }) {
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

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
                        data-testid={id}
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

                <div className="mb-4 ml-[70%]">
                  <button
                    data-testid="save-btn"
                    className="transition duration-500 bg-violet-500 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 ease-in duration-200 font-medium rounded-2xl text-lg font-bold py-2 px-10 rounded "
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
