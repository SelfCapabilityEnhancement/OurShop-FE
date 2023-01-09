import { useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { TextSubmission } from '@/components/common/TextSubmission/TextSubmission';
import { getCurrentUser, updateUserInfo } from '@/service';
import Banner from '@/components/common/banner/Banner';

const baseCites = [
  { id: 1, name: 'Beijing' },
  { id: 2, name: 'Chengdu' },
  { id: 3, name: 'Shanghai' },
  { id: 4, name: 'Shenzhen' },
  { id: 5, name: 'Wuhan' },
  { id: 6, name: `Xi'an` },
];

export default function MyInformation() {
  const navigate = useNavigate();
  const handleClick = async () => {
    await updateUserInfo(selectedCity.name, shippingAddress);
    navigate('/home');
  };
  const [selectedCity, setSelectedCity] = useState(baseCites[0]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [saveShippingAddress, setSaveShippingAddress] =
    useState(shippingAddress);
  const [userTelephoneNum, setUserTelephoneNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);

  const handleEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShippingAddress(event.target.value);
  };

  const routerList = localStorage.getItem('router');
  if (routerList === null) {
    useEffect(() => {
      setShowNotLoginBanner(true);
      setTimeout(() => {
        setShowNotLoginBanner(false);
        navigate('/login');
      }, 2000);
    }, []);
    return (
      <Banner
        visible={showNotLoginBanner}
        success={false}
        message={'Not Login'}
      />
    );
  } else {
    useEffect(() => {
      getCurrentUser().then((user) => {
        setShippingAddress(user.address);
        setSaveShippingAddress(user.address);
        setUserTelephoneNum(user.telephoneNum);
        baseCites.forEach((baseCity) => {
          if (baseCity.name === user.office) {
            setSelectedCity(baseCity);
          }
        });
        setPageVisible(true);
      });
    }, []);

    function handleClickCancel() {
      setVisible(false);
    }

    const handleClickSave = () => {
      setSaveShippingAddress(shippingAddress);
      setVisible(false);
    };

    function handleClickEdit() {
      return () => {
        setVisible(true);
        setShippingAddress(saveShippingAddress);
      };
    }

    return (
      <div className="relative mx-auto mt-10 h-[720px] w-[600px] rounded-2xl bg-zinc-300/40 p-4 shadow-lg">
        {pageVisible ? (
          <div>
            <h1 className="address-header mb-10 text-center text-3xl">
              My Information
            </h1>
            <div className="m-8 flex items-center justify-between">
              <p className="text-2xl font-semibold">My Office</p>
              <Listbox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative mt-1 w-28">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedCity.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {baseCites.map((city) => (
                        <Listbox.Option
                          key={city.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
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
            <div className="m-8 flex items-center justify-between">
              <p className="text-2xl font-semibold">My Shipping Address</p>
              <p
                data-testid="edit-address"
                className="edit-btn text-2xl font-semibold text-indigo-400"
                onClick={handleClickEdit()}
              >
                Edit
              </p>
            </div>
            <p className="m-8 text-2xl font-light">{saveShippingAddress}</p>
            <div className="m-8 flex items-center justify-between">
              <p className="text-2xl font-semibold">My Phone</p>
              <p className="edit-btn text-2xl font-semibold text-indigo-400">
                Edit
              </p>
            </div>
            {visible ? (
              <TextSubmission
                value={shippingAddress}
                handleEdit={handleEdit}
                handleCancel={handleClickCancel}
                handleSave={handleClickSave}
              />
            ) : (
              <div>
                <p className="m-8 text-2xl font-light">{userTelephoneNum}</p>
                <button
                  type="button"
                  onClick={handleClick}
                  className="go-home absolute bottom-10 right-10 h-12 w-1/2 rounded-lg bg-violet-500 px-3 py-3 text-lg font-semibold text-white transition duration-200 ease-in hover:bg-violet-700 "
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
