import { useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { TextSubmission } from '@/components/common/TextSubmission/TextSubmission';
import { User } from '@/components/common/CustomeTypes';
import { http, getCurrentUser } from '@/service';

const baseCites = [
  { id: 1, name: 'Wuhan' },
  { id: 2, name: `Xi'an` },
  { id: 3, name: 'Shanghai' },
  { id: 4, name: 'Chengdu' },
];

export default function MyInformation() {
  const navigate = useNavigate();
  const handleClick = async () => {
    await http.post('/user/updateUserAddressAndOffice', {
      userId: user?.id,
      office: selectedCity.name,
      address: shippingAddress,
    });
    navigate('/home');
  };
  const [selectedCity, setSelectedCity] = useState(baseCites[0]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [saveShippingAddress, setSaveShippingAddress] =
    useState(shippingAddress);
  const [Visible, setVisible] = useState(false);
  const [user, setUser] = useState<User>();
  const [pageVisible, setPageVisible] = useState(false);

  const handleEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShippingAddress(event.target.value);
  };

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data[0]);
      setShippingAddress(data[0].address);
      setSaveShippingAddress(data[0].address);
      baseCites.forEach((baseCity) => {
        if (baseCity.name === data[0].office) {
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
    <div className="relative shadow-lg rounded-2xl mx-auto mt-10 w-[600px] h-[720px] bg-zinc-300/40 p-4">
      {pageVisible ? (
        <div>
          <h1 className="address-header text-center text-3xl mb-10">
            My Information
          </h1>
          <div className="flex items-center justify-between m-8">
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
                      className="w-6 h-6"
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
          <div className="flex items-center justify-between m-8">
            <p className="text-2xl font-semibold">My Shipping Address</p>
            <p
              className="edit-btn text-2xl font-semibold text-indigo-400"
              onClick={handleClickEdit()}
            >
              Edit
            </p>
          </div>
          {Visible ? (
            <TextSubmission
              value={shippingAddress}
              handleEdit={handleEdit}
              handleCancel={handleClickCancel}
              handleSave={handleClickSave}
            />
          ) : (
            <div>
              <p className="m-8 text-2xl font-light">{saveShippingAddress}</p>
              <button
                type="button"
                onClick={handleClick}
                className="go-home w-1/2 px-3 py-3 h-12 absolute bottom-10 right-10 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 "
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
