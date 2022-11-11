import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import { classNames } from '@/utils';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';

const basicForm: { id: keyof Product; label: string; type: string }[] = [
  { id: 'name', label: 'Product Name', type: 'string' },
  { id: 'priceMoney', label: 'Price in USD', type: 'number' },
  { id: 'priceToken', label: 'Price in Token', type: 'number' },
];

const initValidateResult = {
  name: false,
  priceToken: false,
  priceMoney: false,
  productCategory: false,
  description: false,
  images: false,
  logisticMethod: false,
};

export default function EditProduct({
  isOpen,
  handleClose,
  oldProduct,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldProduct: Product;
}) {
  // eslint-disable-next-line no-unused-vars
  const [validations, setValidations] = useState<any>(initValidateResult);
  const [product, setProduct] = useState<Product>(oldProduct);
  const [images, setImages] = useState<{ imageURL: string; image: File }[]>([]);
  const [logisticMethods, setLogisticMethods] = useState(new Set());
  const [categories, setCategories] = useState(new Set());

  useEffect(() => {
    setProduct(oldProduct);
    setLogisticMethods(new Set(oldProduct.logisticMethod.split(';')));
    setCategories(new Set());
    setImages(() => {
      const tmp: { imageURL: string; image: File }[] = [];
      oldProduct.images.split(',').forEach((imageURL) => {
        tmp.push({ imageURL, image: new File([], '') });
      });
      return tmp;
    });
  }, [oldProduct]);

  const handleCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    productCategory: string
  ) => {
    if (event.target.checked) {
      setCategories((prevState) => {
        const tmp = [...prevState, productCategory];
        setProduct((prevState) => {
          const productCategory = [...tmp].join(';');
          return {
            ...prevState,
            productCategory,
          };
        });
        return new Set(tmp);
      });
    } else {
      setCategories((prevState) => {
        const tmp = [...prevState].filter((x) => x !== productCategory);
        setProduct((prevState) => {
          const productCategory = [...tmp].join(';');
          return {
            ...prevState,
            productCategory,
          };
        });
        return new Set(tmp);
      });
    }
  };

  const handleCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    logisticMethod: string
  ) => {
    if (event.target.checked) {
      setLogisticMethods((prevState) => {
        const tmp = [...prevState, logisticMethod];
        setProduct((prevState) => {
          const logisticMethod = [...tmp].join(';');
          return {
            ...prevState,
            logisticMethod,
          };
        });
        return new Set(tmp);
      });
    } else {
      setLogisticMethods((prevState) => {
        const tmp = [...prevState].filter((x) => x !== logisticMethod);
        setProduct((prevState) => {
          const logisticMethod = [...tmp].join(';');
          return {
            ...prevState,
            logisticMethod,
          };
        });
        return new Set(tmp);
      });
    }
  };

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = event.target.value;
    const tmp = { ...product };
    switch (field) {
      case 'name':
        tmp.name = value;
        break;
      case 'priceMoney':
        tmp.priceMoney = Number(value);
        break;
      case 'priceToken':
        tmp.priceToken = Number(value);
        break;
      case 'description':
        tmp.description = value;
        break;
      case 'logisticMethodComment':
        tmp.logisticMethodComment = value;
    }

    setProduct(tmp);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[550px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 grid grid-cols-3"
                >
                  <div></div>
                  <div className="justify-self-center font-semibold">
                    Edit Product
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
                  <form className="mb-6 grid grid-cols-2 gap-y-3 text-xl font-normal">
                    {basicForm.map(({ id, label, type }) => (
                      <div
                        key={id}
                        className="col-span-2 grid grid-cols-2 gap-y-4"
                      >
                        <label htmlFor={id} className="mr-5 w-30">
                          <span className="text-red-500 pr-1">*</span>
                          {label}
                        </label>
                        <input
                          type={type === 'string' ? 'text' : 'number'}
                          className={classNames(
                            'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring',
                            validations[id]
                              ? 'outline-none ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) => handleInputField(event, id)}
                          value={product[id] as string}
                          id={id}
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="category" className="mr-5 col-span-2">
                        <span className="text-red-500 pr-1">*</span>
                        Product Category
                      </label>
                      <div className="grid-rows-3">
                        <label
                          htmlFor="clothes"
                          className="flex flex-row justify-items-start items-center mb-3"
                        >
                          <input
                            id="clothes"
                            type="checkbox"
                            name="category"
                            checked={categories.has('clothes')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.productCategory
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) =>
                              handleCategory(event, 'clothes')
                            }
                          />
                          Clothes
                        </label>
                        <label
                          htmlFor="books"
                          className="flex flex-row justify-items-center items-center mb-3"
                        >
                          <input
                            id="book"
                            type="checkbox"
                            name="category"
                            checked={categories.has('book')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.productCategory
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) => handleCategory(event, 'book')}
                          />
                          Book
                        </label>
                        <label
                          htmlFor="clothes"
                          className="flex flex-row justify-items-end items-center mb-3 "
                        >
                          <input
                            id="souvenir"
                            type="checkbox"
                            name="category"
                            checked={categories.has('souvenir')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.productCategory
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) =>
                              handleCategory(event, 'souvenir')
                            }
                          />
                          Souvenir
                        </label>
                      </div>
                    </div>

                    <label htmlFor="description" className="mr-5 col-span-2">
                      <span className="text-red-500 pr-1">*</span>
                      Product Description
                    </label>
                    <textarea
                      className={classNames(
                        'col-span-2 h-32 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring',
                        validations.description
                          ? 'outline-none ring ring-rose-500'
                          : ''
                      )}
                      value={product.description}
                      onChange={(event) =>
                        handleInputField(event, 'description')
                      }
                      id="description"
                    />

                    <ImageUploader
                      images={images.map(({ imageURL }) => imageURL)}
                      handleNewImage={() => {}}
                      handleRemoveImage={() => {}}
                      validation={validations.images}
                    />

                    <div className="col-span-2 flex flex-col mt-3">
                      <div className="text-xl mb-3">
                        <span className="text-red-500 mb-1 pr-1">*</span>
                        Logistic Methods
                      </div>
                      <label
                        htmlFor="office"
                        className="flex flex-row items-center mb-2"
                      >
                        <input
                          id="office"
                          type="checkbox"
                          name="logistic"
                          checked={logisticMethods.has('office')}
                          className={classNames(
                            'firstLogisticMethod w-5 h-5 mr-2 accent-violet-500 outline-none',
                            validations.logisticMethod
                              ? 'outline-none ring-inset ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) => handleCheckBox(event, 'office')}
                        />
                        Collecting at Office
                      </label>
                      <label
                        htmlFor="address"
                        className="flex flex-row items-center"
                      >
                        <input
                          id="address"
                          type="checkbox"
                          name="logistic"
                          checked={logisticMethods.has('address')}
                          className={classNames(
                            'secondLogisticMethod w-5 h-5 mr-2 accent-violet-500 outline-none',
                            validations.logisticMethod
                              ? 'outline-none ring-inset ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) => handleCheckBox(event, 'address')}
                        />
                        Shipping to an Address
                      </label>
                    </div>
                    <label
                      htmlFor="logisticMethodComment"
                      className="text-xl mr-5 col-span-2 mt-2"
                    >
                      Comment
                    </label>
                    <textarea
                      className="col-span-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded mb-5 focus:outline-none focus:ring"
                      value={product.logisticMethodComment}
                      onChange={(event) =>
                        handleInputField(event, 'logisticMethodComment')
                      }
                      id="logisticMethodComment"
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
